import * as marked from 'marked'

const style = `
.fm-Content {
    white-space: normal;
}

.fm-Content p {
    margin: 24px 0;
}

.fm-Content h2 {
    margin: 24px 0 16px;
}

.fm-Content li + li {
    margin-top: 8px;
}
`

const isTextArticle = (contentElement: Element) => {
    return !!contentElement.lastElementChild && contentElement.lastElementChild.nodeName === 'DIV'
}

const setup = async () => {
    const rootElement = document.querySelector('#root')

    const styleElement = document.createElement('style')
    styleElement.innerHTML = style
    document.head.appendChild(styleElement)

    const replace = (contentElement: Element) => {
        const postsUrl = /^\/fanbox\/creator\/\d+\/post/.exec(location.pathname)[0]
        contentElement.classList.add('fm-Content')
        contentElement.innerHTML = marked(contentElement.textContent, {
            gfm: true,
            breaks: true,
        })
    }


    let el: Element  = null
    while (el == null) {
        el = [...document.querySelectorAll('button')].find(el => el.textContent === 'いいね')

        if (!el) {
            await new Promise(r => requestAnimationFrame(r))
            continue
        }

        const contentElement = el.parentElement!.parentElement!.parentElement!.children[1].lastElementChild

        if (isTextArticle(contentElement)) {
            replace(contentElement.lastElementChild)
        } else {
            replace(contentElement)
        }

        await new Promise(r => requestAnimationFrame(r))
    }
}

let lastPath: string = ''
setInterval(() => {
    if (!/\/fanbox\/creator\/\d+\/post\/\d+/.test(location.pathname)) {
        lastPath = ''
    } else if (location.pathname !== lastPath) {
        lastPath = location.pathname
        setup()
    }
}, 100)
