import { Notify } from 'notiflix/build/notiflix-notify-aio';

const options = {
  position: 'center-center',
  timeout: 10000,
};

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onFormSubmit);

function onFormSubmit(e) {
  e.preventDefault();
  
  const { delay, step, amount } = e.currentTarget.elements;

  let inputDelay = Number(delay.value);
  const inputStep = Number(step.value);
  const inputAmount = Number(amount.value);

  for (let i = 1; i < inputAmount; i+=1){
    inputDelay += inputStep;
    createPromise(i, inputDelay)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, options);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, options);
    });
  }
  e.currentTarget.reset();
}


function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
     const shouldResolve = Math.random() > 0.3;
     setTimeout(() => {
      if (shouldResolve) {
   resolve({position, delay});
  } else {
    reject ({position, delay});
  }
     }, delay);
  
  });
}
 


