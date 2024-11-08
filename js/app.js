console.log('hello world')

const URL = 'https://jsonplaceholder.typicode.com/photos?_limit=6'
const body = document.querySelector('body')
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

    const myOverlay = overlay_template.content.cloneNode(true)
    const blackScreen = myOverlay.querySelector('.overlay')
    const overlayButton = myOverlay.querySelector('.btn')
    const overlayImg = myOverlay.querySelector('.overlay img')

    overlayImg.src = currentImg.src

    blackScreen.addEventListener('click', (event) => {
        if (event.target.classList.contains('overlay')) {
            removeOverlay()
        }
    })
    overlayButton.addEventListener('click', (event) => {
        event.stopPropagation()
        removeOverlay()
    })
    body.classList.toggle('of-hidden')

    body.prepend(myOverlay)
}

function removeOverlay() {
    const myOverlay = body.querySelector('.overlay')
    body.classList.toggle('of-hidden')

    myOverlay.remove()
}

getPhotos(URL)
