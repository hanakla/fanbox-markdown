import * as marked from 'marked'
import { debounce } from 'lodash-es'

const style = `
.fm-Content li + .fm-Content li {
    margin-top: 1px;
}
`

document.addEventListener('DOMContentLoaded', async () => {
    const rootElement = document.querySelector('#root')

    const styleElement = document.createElement('style')
    styleElement.innerHTML = style
    document.head.appendChild(styleElement)

    const initialize = debounce((contentElement: Element) => {
        const postsUrl = /^\/fanbox\/creator\/\d+\/post/.exec(location.pathname)[0]
        contentElement.innerHTML = marked(contentElement.textContent)
        contentElement.classList.add('fm-Content')

        console.log(marked(contentElement.textContent))
    }, 1000)


    let el: Element  = null
    while (el == null) {
        el = [...document.querySelectorAll('button')].find(el => el.textContent === 'いいね')


        if (!el) {
            await new Promise(r => setTimeout(r, 0))
            continue
        }

        const contentElement = el.parentElement!.parentElement!.parentElement!.children[1].lastChild as Element
        contentElement && initialize(contentElement)

        await new Promise(r => setTimeout(r, 0))
    }
})

