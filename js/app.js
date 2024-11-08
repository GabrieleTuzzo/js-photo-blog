console.log('hello world')

const URL = 'https://jsonplaceholder.typicode.com/photos?_limit=6'
const body = document.body
const root = document.getElementById('gallery_container')
const photo_template = document.getElementById('photo_template')
const overlay_template = document.getElementById('overlay_template')

function getPhotos(url) {
    axios.get(url).then((response) => {
        const myData = response.data
        const docFrag = document.createDocumentFragment()
        console.log(myData)
        myData.forEach((el) => {
            const newPhoto = photo_template.content.cloneNode(true)
            const photoImg = newPhoto.querySelector('.card__image img')
            const photoText = newPhoto.querySelector('.card__body p')
            const photoCard = newPhoto.querySelector('.card')

            photoImg.src = el.url
            photoText.textContent = el.title

            photoCard.addEventListener('click', (event) => {
                drawOverlay(event)
            })

            docFrag.appendChild(newPhoto)
        })

        root.appendChild(docFrag)
    })
}

function drawOverlay(event) {
    const currentImg = event.currentTarget.querySelector('.card__image img')

    const overlayContentFragment = overlay_template.content.cloneNode(true)
    const overlayElement = overlayContentFragment.firstElementChild
    const overlayImgElement =
        overlayContentFragment.querySelector('.overlay img')

    overlayImgElement.src = currentImg.src

    overlayElement.addEventListener('click', (event) => {
        event.stopPropagation()
        const target = event.target
        if (!target.matches('img')) {
            removeParentBySelector(target, '.overlay')
            body.classList.toggle('of-hidden')
        }
    })

    body.classList.toggle('of-hidden')
    body.prepend(overlayContentFragment)
}

function removeParentBySelector(target, selector) {
    const parent = target.closest(selector)
    parent.remove()
}

getPhotos(URL)
