import CreateElem from "./createElem";
import birdsData from "./birdsData";
import birdsDataEn from "./birdDataEn";
import createPlayer from "./createAudio";
import audioPlayer from "./AudioPleer"
const createCard = (lvl, id, lang, card) => {
    let birdArr  = (lang === "Ru")? birdsData : birdsDataEn;
    const container = document.querySelector('.cards');
    container.innerHTML = '';

    let wrap = new CreateElem('div',['cards__wrapper']);
    let infowrap = new CreateElem('div',['info__wrapper']);
    let img = new CreateElem('img',['card__img']);
    img.src= (card !== undefined)? card.image: `${birdArr[lvl][`${id - 1}`].image}`;

    let info = new CreateElem('div',['card__info']);
    let name = (card !== undefined)? new CreateElem('h4',['card__name'], card.name) :new CreateElem('h4',['card__name'], birdArr[lvl][`${id - 1}`].name );
    let latname = (card !== undefined)?  new CreateElem('p',['card__latname'],card.species) : new CreateElem('p',['card__latname'], birdArr[lvl][`${id - 1}`].species );
    let src = (card !== undefined)? card.audio : `${birdArr[lvl][`${id - 1}`].audio}`;
    let audio = createPlayer(src);
    info.append(name, latname, audio);
    infowrap.append(img, info);

    let contentwrap = new CreateElem('div',['content__wrapper']);
    let text = (card !== undefined)? new CreateElem('p',['card__text'],card.description) : new CreateElem('p',['card__text'],birdArr[lvl][`${id - 1}`].description);
    contentwrap.append(text);

    wrap.append(infowrap,contentwrap);
    if(card !== undefined) return wrap; 
    container.append(wrap);
    // audioPlayer();
}

export default createCard;