//se favorites nao existir inicia com array vazio
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];


//pegar imagem externa
async function getExternalImage() {

    try {
        const reponse =  await fetch('https://source.unsplash.com/random');
    
        document.querySelector('.image').innerHTML = `<img src="${reponse.url}">`

    }catch(err) {
        console.error(err)
    }
}
getExternalImage();
//clicar no botao, pegar imagem externa
document.querySelector('button').addEventListener('click', getExternalImage);

//clicar na imagem
document.querySelector('.image').onclick = function() {
    //salvar no localStorage ou remover
    const imageSource = document.querySelector('.image img').src

    //se esta no localStorage (favorites), remover
    //indexOf() -> devolve a posição do array do imageSoucer
    const index = favorites.indexOf(imageSource);
    const existsInLocalStorage = index != -1;
    if (existsInLocalStorage) {
        //remove apartir do inicio -> splice(inicio, quantidade)
        favorites.splice(index, 1);
    }else { //salvar se nao tiver no localStorage
        favorites.push(imageSource);
    }

    localStorage.setItem('favorites', JSON.stringify(favorites))


}