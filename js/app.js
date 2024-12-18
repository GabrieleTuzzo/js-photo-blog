console.log('hello world')

const URL = 'https://jsonplaceholder.typicode.com/photos?_limit=6'
const body = document.body
const root = document.getElementById('gallery_container')
const photo_template = document.getElementById('photo_template')
const overlay_template = document.getElementById('overlay_template')

function getPhotos(url) {
    axios
        .get(url)
        .then(
            (response) => {
                const myData = response.data
                const docFrag = document.createDocumentFragment()
                console.log(myData)
                myData.forEach((el) => {
                    const newPhoto = photo_template.content.cloneNode(true)
                    const photoImg = newPhoto.querySelector('.card__image img')
                    const photoText = newPhoto.querySelector('.card__body p')

                    photoImg.src = el.url
                    photoText.textContent = el.title

                    docFrag.appendChild(newPhoto)
                })

                root.appendChild(docFrag)
            }
            // (err) => {} Altro modo di ottenere l'errore
        )
        .catch((error) => {
            console.log(error)
        })
}

function drawOverlay(currentImgElement) {
    const overlayContentFragment = overlay_template.content.cloneNode(true)
    const overlayElement = overlayContentFragment.firstElementChild
    const overlayImgElement = overlayElement.querySelector('.overlay img')

    overlayImgElement.src = currentImgElement.src

    overlayElement.addEventListener('click', (event) => {
        event.stopPropagation()
        const target = event.target
        if (!target.matches('img')) {
            const overlay = target.closest('.overlay')
            overlay.remove()
            body.classList.toggle('of-hidden')
        }
    })

    body.classList.toggle('of-hidden')
    body.prepend(overlayContentFragment)
}

getPhotos(URL)

root.addEventListener('click', (event) => {
    const target = event.target
    if (target.closest('.card') !== null) {
        const currentImg = event.currentTarget.querySelector('.card__image img')
        drawOverlay(currentImg)
    }
})

// function myMap(array, callback) {
//     const returnArray = []
//     for (let i = 0; i < array.length; i++) {
//         returnArray.push(callback(array[i], i))
//     }

//     return returnArray
// }

// console.log(myMap([1, 6, 3, -4, 54], (num, index) => num * index))
