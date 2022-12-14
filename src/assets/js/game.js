import birdsData from "./birdsData";
import birdsDataEn from "./birdDataEn";
import createResult from "./createResult";
import CreateElem from"./createElem";
import lang from "./lang";

class Game{

  constructor({random, lvl, win, score, step, gameEnd, language}){
      this.random = random;
      this.lvl = lvl;
      this.win = win,
      this.score = score,
      this.step = step,
      this.gameEnd = gameEnd,
      this.language = language
      
  }

  startGame(){
    this.score = 0;
    let scoreValue = document.querySelector('#score');
    scoreValue.innerHTML = this.score;
    this.lvl =0;
    this.gameEnd = false;
    let btnlvl = document.querySelector('#next');
    btnlvl.innerHTML= lang.nextBtn[`${this.language}`][0];;
    this.deleteCard();
    this.closeRandomCard();  
  }

  getRandomBird(){
    let randBird = (this.language === 'Ru')? birdsData[`${this.lvl}`][`${Math.floor(Math.random() * 6)}`] : birdsDataEn[`${this.lvl}`][`${Math.floor(Math.random() * 6)}`];
    let questAudio = document.querySelector('.audio');
    questAudio.src = randBird.audio;
    this.win = false;
    this.step = 0;
    console.log(randBird.name)
    return randBird;
  }

  deleteCard(){
    const container = document.querySelector('.cards');
    container.innerHTML = '';
    let text1 = new CreateElem('p',['cards__text'],lang.cardText[`${this.language}`][0]);
    let text2 = new CreateElem('p',['cards__text'],lang.cardText[`${this.language}`][1]);
    container.append(text1,text2);
  }

  checkCards(randomCardId, currentCardId, dot){
    if(dot.classList.contains('error') || dot.classList.contains('success') )return;
    if(this.win === false) this.step ++;
    if(randomCardId == currentCardId){
      this.audioEffect(true);
      this.win = true;
      this.openRandomCard();
      dot.classList.add('success')
      this.getNextPage(this.step);
    }else{
      if(this.win) return;
      dot.classList.add('error');
      this.audioEffect(false)
    }
  }

  audioEffect(win){
    const audioErorr = new Audio('./assets/media/error.mp3');
    const audioSucceess = new Audio('./assets/media/success.mp3');
    if(win){
        (!this.win)? audioSucceess.play() :  audioSucceess.pause();
    }else{
        (!this.win)? audioErorr.play() :  audioErorr.pause();
    }
  }

  getNextPage(){
    let btnlvl = document.querySelector('#next');
    btnlvl.classList.add('btn-active');
    // console.log("LVL:" + this.lvl)
    if(this.lvl === 5)btnlvl.innerHTML= lang.rusultBtn[`${this.language}`][0];

    this.score = this.score + 6 - this.step;
    let score = document.querySelector('#score'); 
    score.innerHTML =  this.score;
    // console.log('SCORE:' + this.score)
  }

  addLvl(){
    if(this.lvl < 5){
        this.lvl +=1;
        this.deleteCard();
        this.closeRandomCard(); 
    }else{
      this.lvl = this.lvl;
      this.gameEnd =  true;
      this.showResult();
    }
  }

  showResult(){
    let sections = document.querySelectorAll('.section');
    createResult(this.language, this.score);
    let resultsection = [...sections].map(section => 
        (section.classList.contains('section-result')) ? section.classList.remove('hide'): section.classList.add('hide'));
    let navs = document.querySelectorAll('.navigation__link');
    let nav = [...navs].map(link => 
        (link.id === 'result') ? link.classList.add('active'): link.classList.remove('active'));
  }

  openRandomCard(){
    let image  = document.querySelector('.question__img');
    let name = document.querySelector('.question__name');
    image.src = this.random.image;
    name.innerHTML = this.random.name;
  }

  closeRandomCard(){
    let image  = document.querySelector('.question__img');
    let name = document.querySelector('.question__name');
    image.src = 'https://raw.githubusercontent.com/sinevit/Project1/master/bird.jpg';
    name.innerHTML = '******';
  }
}

export default Game;