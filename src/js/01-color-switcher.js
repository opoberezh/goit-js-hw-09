const CHANGE_COLOR_DELAY = 1000;
let idInt = null;

const els = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
   audioPlayer: document.querySelector('#audio-player'),
}



els.audioPlayer.style.cssText = `opacity: 0; margin-top: 500px;`;

els.audioPlayer.volume = 0.2;

els.btnStart.addEventListener('click', onBtnStartChangeColor, false);
els.btnStop.addEventListener('click', onBtnStopChangeColor, true);

function onBtnStartChangeColor(){
     els.btnStart.disabled = true;
     els.btnStop.disabled = false;
   
    idInt = setInterval(() =>{
        els.body.style.backgroundColor = getRandomHexColor()
    }, CHANGE_COLOR_DELAY);
    
    playAudio ();
}


function onBtnStopChangeColor(){
    els.btnStart.disabled = false;
    els.btnStop.disabled = true;

    clearInterval(idInt);
    pauseAudio ();
}

function playAudio (){
    els.audioPlayer.play();
}

function pauseAudio (){
    els.audioPlayer.pause();
}


function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }