//se favorites nao existir inicia com array vazio
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const imageContainer = document.querySelector('.image');
const button = document.querySelector('button');

//events
button.onclick = () => updateImage();
imageContainer.onclick = () => updateAll();

// Methods

function getState() {
    //salvar no localStorage ou remover
    const imageSource = document.querySelector('.image img').src

    //se esta no localStorage (favorites), remover
    //indexOf() -> devolve a posição do array do imageSoucer
    const index = favorites.indexOf(imageSource);
    const existsInLocalStorage = index != -1;

    return {imageSource, index, existsInLocalStorage};
}

function updateAll() {
    updateFavorites();
    updateClasses();
}

function updateFavorites() {
    
    const {existsInLocalStorage, index, imageSource} = getState();

    existsInLocalStorage 
    ? favorites.splice(index, 1)
    :favorites.push(imageSource);

    // if (existsInLocalStorage) {
    //     //remove apartir do inicio -> splice(inicio, quantidade)
    //     favorites.splice(index, 1);

    // } else { //salvar se nao tiver no localStorage
    //     favorites.push(imageSource);
    // }


    localStorage.setItem('favorites', JSON.stringify(favorites))
}

function updateClasses() {
    const {existsInLocalStorage} = getState();

    imageContainer.classList.remove('fav');

    if (existsInLocalStorage) {
        //remove a classe fav de favorito
        imageContainer.classList.add('fav');
    }
}

async function updateImage() {
    await getExternalImage();
    updateClasses();
}

async function getExternalImage() {
    try {
        const reponse = await fetch('https://source.unsplash.com/random');

        imageContainer.innerHTML = `<img src="${reponse.url}">`

    } catch (err) {
        console.error(err)
    }
}
getExternalImage();




