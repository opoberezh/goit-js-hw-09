const CHANGE_COLOR_DELAY = 1000;
let idInt = null;

const els = {
    btnStart: document.querySelector('button[data-start]'),
    btnStop: document.querySelector('button[data-stop]'),
    body: document.querySelector('body'),
}


els.btnStart.addEventListener('click', onBtnStartChangeColor);
els.btnStop.addEventListener('click', onBtnStopChangeColor);

function onBtnStartChangeColor(){
    els.btnStart.disabled = true;
    els.btnStop.disabled = false;
   
    idInt = setInterval(() =>{
        els.body.style.backgroundColor = getRandomHexColor()
    }, CHANGE_COLOR_DELAY);
   
}


function onBtnStopChangeColor(){
    els.btnStart.disabled = false;
    els.btnStop.disabled = true;

    clearInterval(idInt);
   
}

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }