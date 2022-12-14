console.log('hi')
import './assets/styles/main.scss';
import './assets/media/success.mp3'
import './assets/media/error.mp3'
import './assets/media/endgame.mp3'
// import './assets/img/congrats.gif'
import BirdsList from './assets/js/BirdList'
import createCard from './assets/js/createCard'
import lang from './assets/js/lang'
import Game from './assets/js/game'
import createGallery from './assets/js/createGallery'
import createResult from './assets/js/createResult'
import audioPlayer from './assets/js/AudioPleer'
import birdsData from './assets/js/birdsData'

const NAV = document.querySelector('.navigation');
const NAV_H = document.querySelector('.navigation__hamb');
const Nav_LINKS = document.querySelectorAll('.navigation__link');
const SECTION = document.querySelectorAll('.section');
const blockQuestion = document.querySelector('.question__content');
let audioQuestion = new Audio();
const blockCard = document.querySelector('.answer');
let audioCard = new Audio();
let language = 'En';
let game = new Game({
  random: 0,
  lvl: 0,
  id: 0,
  select: false,
  win: false,
  score: 0,
  step: 0,
  gameEnd: false,
  language: language
})

window.onload = function(){
  createGallery(language)
}

// слушаем клик в navigation, отображаем соответствующую клику страницу
NAV.addEventListener('click',(e) =>{
 checkActiveNav(e)
})

function checkActiveNav(e){
  let noactiveLinks = [...Nav_LINKS].map(el => el.classList.remove('active'));
  let activeSection = [...SECTION].map(s => {
    (s.classList.contains(`section-${e.target.id}`)) ? s.classList.remove('hide'): s.classList.add('hide')
    if(e.target.id === 'game') startGame();
    // if(e.target.id === 'gallery'){ 
    //   createGallery(language);
    // }
    if(e.target.id === 'result') createResult(language);
  })  
  e.target.classList.add('active');
}
//обработка клика на кнопку на стратовой странице
const startBtn = () =>{
  [...Nav_LINKS].map(el => (el.id === 'game')? el.classList.add('active') : el.classList.remove('active'));
  let activeSection = [...SECTION].map(s => (s.classList.contains(`section-game`)) ? s.classList.remove('hide'): s.classList.add('hide'))
  startGame();
}
window.startBtn = startBtn;

//начало игры
function startGame(){
  game.startGame();
  startlvl()
 }
 
//начало нового уровня, генерация списка птиц
async function startlvl(){
  BirdsList(game.lvl, language);
  getActiveLvl();
  game.random = game.getRandomBird();

  let birds = document.querySelectorAll('.birds__item');
  listenBirdList(birds,audioQuestion);
  audioCard.pause();
  audioCard.currentTime = 0;
  if(game.lvl !==0){
    audioQuestion.pause();
    audioQuestion.currentTime = 0;
    let playBtnQ = blockQuestion.querySelector(".player-controls .player-icon ");
    playBtnQ.classList.remove("pause");
    playBtnQ.classList.add("play");
  }
  audioPlayer(blockQuestion, game.random.audio, audioQuestion);

}

function getActiveLvl(){
  const LVL_Name = document.querySelectorAll('.levels__name');
  let lvls = [...LVL_Name].map(lv => (lv.id.slice(-1) == game.lvl)? lv.classList.add('active'): lv.classList.remove('active'))
}

function listenBirdList(arr, audio){
  [...arr].map(el => {
    el.addEventListener('click', (e) =>{
      //для каждый птицы из списка по щелчку создаем карточку
      createCard(game.lvl, el.id, language);
      //для каждый птицы проверяем ее с загаданной птицей
      game.checkCards(game.random.id, el.id , el.firstChild);

      //если уровень выйгран остановить голос загаданной птицы
      if(game.win){
        // console.log('win')
        audio.pause();
        let playBtnQ = blockQuestion.querySelector(".player-controls .player-icon ");
        playBtnQ.classList.remove("pause");
        playBtnQ.classList.add("play");
      }

      //остановить предыдущую песню из списка птиц
      audioCard.pause();
      audioCard.currentTime = 0;
      //создаем новое аудио
      audioPlayer(blockCard, birdsData[game.lvl][`${el.id - 1}`].audio, audioCard);
  })
})
}

const LVL_BTN = document.querySelector('#next');
LVL_BTN.addEventListener('click', (e) =>{
  if(LVL_BTN.classList.contains('btn-active')){
    LVL_BTN.classList.remove('btn-active');
    game.addLvl(game.step)
    startlvl();
  }
})

 //---------------------locale storage--------------
 const LANGUAGE_BTN = document.querySelector('.header__lang');

 const setLocalStorage = () => {
   localStorage.setItem('language', LANGUAGE_BTN.innerHTML);
 }
 
 const getLocalStorage = () => {
   if(localStorage.getItem('language')) {
     LANGUAGE_BTN.innerHTML = localStorage.getItem('language');
     language = localStorage.getItem('language');
     checkLanguage()
   }
 }
 window.addEventListener('load', getLocalStorage)
 window.addEventListener('beforeunload', setLocalStorage)
 
 // меняет язык по клику
 const changeLanguage = () => {
   language = (language === 'Ru')? 'En': 'Ru';
   LANGUAGE_BTN.innerHTML = language;
   BirdsList(game.lvl, language);
   createGallery(language);
   game.language = language;
   checkLanguage();
 }
 
 LANGUAGE_BTN.addEventListener('click', changeLanguage);

 //при изменении языка меняются поля
 function checkLanguage(){
  const START_BTN = document.querySelector('#start-btn');
  const NEXT_BTN = document.querySelector('#next');
  const START_TEXT = document.querySelector('.start-text');
  game.language = language;
  console.log("LANGUAGE  "+ language);
  let Nav = [...document.querySelectorAll('.navigation__link')].map((el,index) => el.innerHTML = lang.nav[`${language}`][index]);
  START_BTN.innerHTML = lang.startBtn[`${language}`][0];
  let score = document.querySelector('.score__text');
  score.innerText = lang.score[`${language}`][0];
  let lvls = [...document.querySelectorAll('.levels__name')].map((el,index) => el.innerHTML = lang.lvl[`${language}`][index]);
  game.deleteCard();
  NEXT_BTN.innerHTML = lang.nextBtn[`${language}`][0];
  START_TEXT.innerHTML = lang.text[`${language}`][0];
  createGallery(language)

 }