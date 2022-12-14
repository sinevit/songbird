 import CreateElem from "./createElem";
 import birdsData from "./birdsData";
 import birdsDataEn from "./birdDataEn";
 import createCard from "./createCard";
 import audioPlayer from "./AudioPleer"

 function getAllBird(lang){
  let arr = [];
  let birdArr = (lang === 'Ru')? birdsData : birdsDataEn;
  birdArr.map(el =>el.map(elem => arr.push(elem)))
  return arr;
 }
function createGallery(lang){
  let newArr = getAllBird(lang);
  let section = document.querySelector('.section-gallery');
  section.innerHTML = '';
  let wrapper = CreateElem('div', ['section__wrapper','gallery__section'])
  let cards = CreateElem('div', ['cards-gallery'])
  newArr.map((el) =>{
    let card = createCard(0,0,lang,el)
    let cardwrap = CreateElem('div', ['card__content'])
    cardwrap.append(card)
    const audioGallery = new Audio();
    audioPlayer(cardwrap, el.audio, audioGallery);
    cards.append(cardwrap)
  })
  wrapper.append(cards)
  section.append(wrapper)

 }

 export default createGallery;