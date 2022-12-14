const audioPlayer = (parentBlock, song, audio) =>{
// console.log((parentBlock, song, audio) )
    let curTime = 0;
    audio.src = song;  

    const DURATION = parentBlock.querySelector(".player-controls .time__wrapper .span-time .songs-duration"); 
    const PROGRESS_TIME = parentBlock.querySelector('.progress-time');
    const CURRENT_TIME = parentBlock.querySelector('.songs-time');
    const VOLUME = parentBlock.querySelector('.volume');
    const PROGRESS_VOLUME = parentBlock.querySelector('.progress-volume');
    
    audio.onended = () => {
      playBtn.classList.remove("pause");
      playBtn.classList.add("play");
      CURRENT_TIME.innerHTML="00:00";
      audio.currentTime = 0
    }

    //обработчик клика на кнопку
    const playBtn = parentBlock.querySelector(".player-controls .player-icon ");
    playBtn.addEventListener("click", playAudio);
    async function playAudio(){
      if (audio.paused) {
        // await  audio.play();
        setTimeout(function() {
          audio.play();

        }, 0);
        playBtn.classList.remove("play");
        playBtn.classList.add("pause");
        audio.currentTime = curTime;
        // DURATION.innerHTML = getDuration(audio.duration);
        getProgressTime();
      } else {
        playBtn.classList.remove("pause");
        playBtn.classList.add("play");
        audio.pause();
        curTime = audio.currentTime;
      }
      // console.log(curTime)
    }
    //прогрессбар песни
    function getProgressTime(){
      setInterval(() => {
          PROGRESS_TIME.value = audio.currentTime /audio.duration * 100;
          CURRENT_TIME.textContent = getTimeCodeFromNum(audio.currentTime);
        }, 100);
    }

    function getTimeCodeFromNum(num) {
      let seconds = parseInt(num);
      let minutes = '0'+parseInt(seconds / 60);
      seconds -= minutes * 60;
      return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
    }

    //возможность перетаскивать ползунок песни
    PROGRESS_TIME.addEventListener('click', e => {
      const timelineWidth = window.getComputedStyle(PROGRESS_TIME).width;
      const timeToSeek = e.offsetX / parseInt(timelineWidth)* audio.duration;
      audio.currentTime = timeToSeek;
    }, false)

    //слушатель кнопки mute/unmute
    VOLUME.addEventListener('click', () =>{
      audio.muted = !audio.muted;
      VOLUME.classList.toggle('mute');
      (audio.muted) ? PROGRESS_VOLUME.value = '0': PROGRESS_VOLUME.value = '50';
    })

    //изменить громкось звука
    PROGRESS_VOLUME.addEventListener('click', e => {
      const sliderWidth = window.getComputedStyle(PROGRESS_VOLUME).width;
      const newVolume = e.offsetX / parseInt(sliderWidth);
      audio.volume = newVolume;
    }, false)

    function getDuration(time){
      let t = Math.round(time);
      let min =((String(Math.floor(t/60))).length === 1)? '0'+Math.floor(t/60): Math.floor(t/60);
      let sec =((String(Math.floor(t%60))).length === 1)? '0'+Math.floor(t%60): Math.floor(t%60);
      return `${min}:${sec}`
    }
  
    audio.addEventListener("loadeddata",() => {
        DURATION.textContent = getDuration(audio.duration);
        audio.volume = 0.5;
      },false);

}


export default audioPlayer;