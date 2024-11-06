console.log('hello world')

const URL = 'https://jsonplaceholder.typicode.com/photos?_limit=6'
const root = document.getElementById('gallery_container')
const photo_template = document.getElementById('photo_template')

function getPhotos(url) {
    axios.get(url).then((response) => {
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
    })
}

getPhotos(URL)
