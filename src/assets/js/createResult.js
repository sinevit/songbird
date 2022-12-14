import CreateElem from "./createElem";

const createResult = (lang, score) => {

  let section = document.querySelector('.section-result');
  section.innerHTML = '';
  let wrapper = CreateElem('div', ['section__wrapper'])

  if(!score){
    let content = CreateElem('div', ['section__content']);
    let p1 = CreateElem('h3', ['section__title'], `${(lang === 'Ru')? 'Результатов пока нет!': 'No result!'}`);
    content.append(p1);
    wrapper.append(content);
    // audio(false);
  }else{
    let img = CreateElem('img', ['congrats__img']);
    img.src = "https://raw.githubusercontent.com/sinevit/Project1/master/congrats.gif";
    let content = CreateElem('div', ['section__content']);
    let title = CreateElem('h3', ['section__title'], `${(lang === 'Ru')? 'Поздравляем!': 'Congartulation!'}`);
    let p = CreateElem('p', ['section__text']);
    if(score == '30'){
      p.innerHTML =  (lang === 'Ru')? `Вы прошли викторину и набрали максимальное количество очков!` : ` Game over! You passed the quiz and scored the maximum points!`;
    }else{
      p.innerHTML =  (lang === 'Ru')? `Вы прошли викторину и набрали ${score} из 30 возможных очков!` : ` Game over! Your score ${score} out of 30 points!`;
    }
    let btnWrap = CreateElem('div', ['btn__wrap']);
    btnWrap.innerHTML =`<button class="btn section__btn" id="restart-btn" onclick="startBtn()">${(lang === 'Ru')? 'Попробовать еще раз!': 'Try again!'}</button>`;
    content.append(title, p, btnWrap);
    wrapper.append(img, content);
    audio(true);
  }
  
  section.append(wrapper);

}

function audio(win){
  const err = new Audio('./assets/media/error.mp3');
  const endgame = new Audio('./assets/media/endgame.mp3');
  if(win){
    endgame.play() 
  }else{
    err.play() 
  }
}

export default createResult;