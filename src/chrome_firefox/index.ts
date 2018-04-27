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

document.addEventListener('DOMContentLoaded', async () => {
    const rootElement = document.querySelector('#root')

    const styleElement = document.createElement('style')
    styleElement.innerHTML = style
    document.head.appendChild(styleElement)

    const initialize = (contentElement: Element) => {
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
            initialize(contentElement.lastElementChild)
        } else {
            initialize(contentElement)
        }

        await new Promise(r => requestAnimationFrame(r))
    }
})

