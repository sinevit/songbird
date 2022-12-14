import birdsData from "./birdsData";
import birdsDataEn from "./birdDataEn";
  
  const BirdsList = (lvl, lang) => {
    let list = document.querySelector('.birds__list');
    list.innerHTML = '';
    let birdArr = (lang === 'Ru')? birdsData : birdsDataEn;
    birdArr[`${lvl}`].map(el => {
        let li = document.createElement('li');
        li.classList.add('birds__item');
        let point = document.createElement('span');
        point.classList.add('birds__pointlist');
        li.innerText = el.name;
        li.id = el.id;
        li.prepend(point);
        list.append(li);
    })
  }
  
  export default BirdsList;
  