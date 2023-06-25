
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Swal from 'sweetalert2';

const Swal = require('sweetalert2');

// document.body.style.backgroundColor = '#f8faf7;';
const TIMER_DELAY = 1000;
let timerId = null;
let selectedDate = null;
let currentDate = null;


 const inputCalendar = document.querySelector('#datetime-picker'); 
const btnStart = document.querySelector('[data-start]');
// const daysData = document.querySelector('[data-days]');
// const hoursData = document.querySelector('[data-hours]');
// const minutesData = document.querySelector('[data-minutes]');
// const secondsData = document.querySelector('[data-seconds]');


btnStart.disabled = true;




flatpickr(inputCalendar, {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      if (selectedDates[0].getTime() < Date.now()) {
            Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please choos date in the future!'});
    } else {
        Swal.fire({
            icon: 'success',
            title: 'Please, click on button start.',
          }); 
          btnStart.disabled = false;
      const setTimer = () => {
        selectedDate = selectedDates[0].getTime();
       counter.start();
    };

    btnStart.addEventListener('click', setTimer);

     }
    },
});

const counter = {
    rootSelector: document.querySelector('.timer'),
    start() {
        timerId = setInterval(() =>{
            btnStart.disabled = true;
            inputCalendar.disabled = true;
            currentDate = Date.now();
            const delta = selectedDate - currentDate;

            
            if (delta <= 0){
               this.stop();
                Swal.fire('👏 Congratulation! Timer stopped!');
                return;
            } 
            const { days, hours, minutes, seconds } = this.convertMs(delta);
            this.rootSelector.querySelector('[data-days]').textContent =
              this.addLeadingZero(days);
            this.rootSelector.querySelector('[data-hours]').textContent =
              this.addLeadingZero(hours);
            this.rootSelector.querySelector('[data-minutes]').textContent =
              this.addLeadingZero(minutes);
            this.rootSelector.querySelector('[data-seconds]').textContent =
              this.addLeadingZero(seconds);
        }, TIMER_DELAY);
    },

    stop() {
        clearInterval(timerId);
        this.inrevalId = null;
        btnStart.disabled = true;
        inputCalendar.disabled = false
    },

    convertMs(ms) {
        const second = 1000;
        const minute = second * 60;
        const hour = minute * 60;
        const day = hour * 24;

        const days = this.addLeadingZero(Math.floor(ms / day));
        const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
        const minutes = this.addLeadingZero(
        Math.floor(((ms % day) % hour) / minute)
    );
        const seconds = this.addLeadingZero(
        Math.floor((((ms % day) % hour) % minute) / second)
    );
        return { days, hours, minutes, seconds };
    },
   
    addLeadingZero(value) {
        return String(value).padStart(2, 0);
      },
};



