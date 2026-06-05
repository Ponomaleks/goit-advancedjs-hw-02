import iziToast from 'izitoast';

import 'izitoast/dist/css/iziToast.min.css';

const FULFILLED = 'fulfilled';
const TOAST_TIMEOUT = 3000;

const toastOptions = {
  timeout: TOAST_TIMEOUT,
  position: 'topRight',
  layout: 2,
  close: false,
  closeOnClick: true,
  icon: false,
  progressBar: false,
  transitionIn: 'fadeIn',
};

const toastErrorOptions = {
  ...toastOptions,
  messageColor: '#fff',
  backgroundColor: '#fd4b3f',
};

const refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector("input[name='delay']"),
};
refs.form.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();
  const delay = Number(refs.delayInput.value);

  if (isNaN(delay) || delay < 0) {
    iziToast.error({
      message: 'Please enter a valid non-negative number for delay.',
      timeout: 3000,
      position: 'topRight',
    });
    return;
  }

  const selectedRadio = document.querySelector('input[name="state"]:checked');
  const action = selectedRadio.value;

  createPromise(action, delay)
    .then(delay => {
      iziToast.success({
        ...toastOptions,
        message: `✅ Fulfilled promise in ${delay} ms`,
      });
    })
    .catch(delay => {
      iziToast.error({
        ...toastErrorOptions,
        message: `❌ Rejected promise in ${delay} ms`,
      });
    });
}

function createPromise(state, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = state === FULFILLED;
      if (shouldResolve) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
}
