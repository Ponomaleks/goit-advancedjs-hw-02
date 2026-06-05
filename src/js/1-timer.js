import flatpickr from 'flatpickr';
import iziToast from 'izitoast';

import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;

const TOAST_ERROR_MESSAGE = 'Please choose a date in the future';
const TOAST_SUCCESS_MESSAGE = 'Countdown finished successfully!';
const TOAST_SUCCESS_SELECTOR = '.date-success';
const TOAST_ERROR_SELECTOR = '.date-warning';
const TOAST_TIMEOUT = 3000;

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  daysEl: document.querySelector('span[data-days]'),
  hoursEl: document.querySelector('span[data-hours]'),
  minutesEl: document.querySelector('span[data-minutes]'),
  secondsEl: document.querySelector('span[data-seconds]'),
  inputEl: document.querySelector('#datetime-picker'),
};

const toastOptions = {
  timeout: TOAST_TIMEOUT,
  position: 'topRight',
  layout: 2,
  iconUrl: 'img/icon-close.svg',
  close: false,
  closeOnClick: true,
  progressBar: false,
  transitionIn: 'fadeIn',
};

const toastErrorOptions = {
  ...toastOptions,
  message: TOAST_ERROR_MESSAGE,
  class: TOAST_ERROR_SELECTOR,
  messageColor: '#fff',
  iconColor: '#fff',
  backgroundColor: '#fd4b3f',
};

const toastSuccessOptions = {
  ...toastOptions,
  message: TOAST_SUCCESS_MESSAGE,
};

const pickerOptions = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: handlePickerClose,
};

flatpickr('#datetime-picker', pickerOptions);

function isDateValid(selectedDate) {
  const currentDate = new Date();
  return selectedDate > currentDate;
}

function handlePickerClose(selectedDates) {
  if (isDateValid(selectedDates[0])) {
    refs.startBtn.disabled = false;
    userSelectedDate = selectedDates[0];
    hideToast();
  } else {
    refs.startBtn.disabled = true;
    iziToast.error(toastErrorOptions);
  }
}

function hideToast(selector = TOAST_ERROR_SELECTOR) {
  const toastList = document.querySelectorAll(selector);

  if (toastList.length > 0) {
    toastList.forEach(toast => {
      iziToast.hide({}, toast);
    });
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function updateTimer({ days, hours, minutes, seconds }) {
  refs.daysEl.textContent = addLeadingZero(days);
  refs.hoursEl.textContent = addLeadingZero(hours);
  refs.minutesEl.textContent = addLeadingZero(minutes);
  refs.secondsEl.textContent = addLeadingZero(seconds);
}

refs.startBtn.addEventListener('click', () => {
  refs.startBtn.disabled = true;
  refs.inputEl.disabled = true;

  const timerId = setInterval(() => {
    const currentDate = new Date();
    const timeDifference = userSelectedDate - currentDate;

    if (timeDifference <= 0) {
      clearInterval(timerId);
      updateTimer({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      iziToast.success(toastSuccessOptions);
      refs.startBtn.disabled = false;
      refs.inputEl.disabled = false;
      return;
    } else {
      const timeComponents = convertMs(timeDifference);
      updateTimer(timeComponents);
    }
  }, 1000);
});
