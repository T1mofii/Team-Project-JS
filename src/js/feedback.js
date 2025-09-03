import Swiper from 'swiper/bundle';
import 'swiper/css';
import 'swiper/css/bundle';
import { getFeedbackByQuery } from './requests.js';

// Рендер звезд
function renderStars(rating) {
  const fullStars = Math.round(rating);
  return `<div class="stars">${'★'.repeat(fullStars)}${'☆'.repeat(5 - fullStars)}</div>`;
}

// Рендер слайдов
function renderFeedbackSlides(feedbacks) {
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  if (!swiperWrapper) return;

  swiperWrapper.innerHTML = feedbacks
    .map(
      ({ rating, descr, name }) => `
      <div class="swiper-slide">
        <div class="feedback-value">
          ${renderStars(rating)}
          <div class="review"><p>${descr}</p></div>
          <div class="author"><p>${name}</p></div>
        </div>
      </div>`
    )
    .join('');
}

// Инициализация Swiper
function initSwiper() {
  new Swiper('.swiper', {
    direction: 'horizontal',
    loop: false,
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'bullets', // пока стандартные буллеты
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
}

// INIT
async function initFeedback() {
  try {
    const feedbacks = await getFeedbackByQuery(10, 1);
    console.log('Loaded feedbacks:', feedbacks); // проверка API

    if (!feedbacks || feedbacks.length === 0) {
      document.querySelector('.swiper-pagination').style.display = 'none';
      return;
    }

    renderFeedbackSlides(feedbacks);

    const paginationEl = document.querySelector('.swiper-pagination');
    paginationEl.style.display = feedbacks.length > 1 ? 'flex' : 'none';

    initSwiper();
  } catch (err) {
    console.error('Ошибка при загрузке фидбеков:', err);
  }
}

// Запуск после загрузки DOM
document.addEventListener('DOMContentLoaded', initFeedback);
