import CreateElem from"./createElem"

function createPlayer(src){
    let audiowr = new CreateElem('div',['audioplayer']);

    let audio = new CreateElem('audio',['audio']);
    audio.src = src;
    let control = new CreateElem('div',['player-controls']);
    let button = new CreateElem('button',['play','player-icon']);
    button.id = 'play-current';
    let timeWrap = new CreateElem('div',['time__wrapper']);
    let timeinput = new CreateElem('input',['progress-time']);
    timeinput.type = 'range';
    timeinput.value = '0';
    timeinput.min = '0';
    timeinput.max = '100';
    let spanwrap = new CreateElem('div',['span-time']);
    let span1 = new CreateElem('span',['songs-time'],'00:00');
    let span2 = new CreateElem('span',['songs-duration']);
    spanwrap.append(span1,span2);
    timeWrap.append(timeinput,spanwrap);
    control.append(button, timeWrap);


    let controlVolume = new CreateElem('div',['volume-controls']);
    let volumebtn = new CreateElem('button',['volume']);
    let volumeWrap = new CreateElem('div',['volume__wrapper']);
    let volumeinput = new CreateElem('input',['progress-volume']);
    volumeinput.type = 'range';
    volumeinput.value = '50';
    volumeinput.min = '0';
    volumeinput.max = '100';
    volumeinput.step = '10';
    volumeWrap.append(volumeinput);
    controlVolume.append(volumebtn,volumeWrap);
    

    audiowr.append(audio,control,controlVolume);
    return audiowr;
    

}

export default createPlayer;