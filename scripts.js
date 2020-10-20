//se favorites nao existir inicia com array vazio
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
const imageContainer = document.querySelector('.image')



//clicar no botao, pegar imagem externa
document.querySelector('button').onclick = () => updateImage();

//clicar na imagem
imageContainer.onclick = () => updateAll();

// Methods

function updateAll() {
    updateFavorites();
    updateClasses();
}

function updateFavorites() {
    //salvar no localStorage ou remover
    const imageSource = document.querySelector('.image img').src

    //se esta no localStorage (favorites), remover
    //indexOf() -> devolve a posição do array do imageSoucer
    const index = favorites.indexOf(imageSource);
    const existsInLocalStorage = index != -1;

    if (existsInLocalStorage) {
        //remove apartir do inicio -> splice(inicio, quantidade)
        favorites.splice(index, 1);

    } else { //salvar se nao tiver no localStorage
        favorites.push(imageSource);
    }


    localStorage.setItem('favorites', JSON.stringify(favorites))
}

function updateClasses() {
    const imageSource = document.querySelector('.image img').src

    const index = favorites.indexOf(imageSource);
    const existsInLocalStorage = index != -1;

    if (existsInLocalStorage) {
        //remove a classe fav de favorito
        imageContainer.classList.remove('fav');

    } else {
        imageContainer.classList.add('fav');
    }
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


function updateImage() {
    getExternalImage();
    updateClasses();
}

