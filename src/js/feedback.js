import Swiper from 'swiper/bundle';
import 'swiper/css';
import 'swiper/css/bundle';
import { getFeedbackByQuery } from './requests.js';

// Рендер звезд
function renderStars(rating) {
  const fullStars = Math.round(rating); // округляємо до найближчого цілого
  const emptyStars = 5 - fullStars;

  let starsHTML = '';

  // Повні зірки
  for (let i = 0; i < fullStars; i++) {
    starsHTML += `<svg class="star full" viewBox="0 0 24 24" width="24" height="24">
      <path fill="#764191" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>`;
  }

  // Порожні зірки
  for (let i = 0; i < emptyStars; i++) {
    starsHTML += `<svg class="star empty" viewBox="0 0 24 24" width="24" height="24">
      <path fill="#828183" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"/>
    </svg>`;
  }

  return `<div class="stars-wrapper">${starsHTML}</div>`;
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
  const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: false,
    slidesPerView: 1,
    spaceBetween: 20,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  const firstEl = document.querySelector('.pagination-item.first');
  const middleEl = document.querySelector('.pagination-item.middle');
  const lastEl = document.querySelector('.pagination-item.last');

  function updatePagination() {
    firstEl.classList.remove('active');
    middleEl.classList.remove('active');
    lastEl.classList.remove('active');

    const index = swiper.activeIndex;
    const lastIndex = swiper.slides.length - 1;

    if (index === 0) firstEl.classList.add('active');
    else if (index === lastIndex) lastEl.classList.add('active');
    else middleEl.classList.add('active');
  }

  updatePagination();
  swiper.on('slideChange', updatePagination);

  // Додатково: кліки по елементам пагінації
  firstEl.addEventListener('click', () => swiper.slideTo(0));
  lastEl.addEventListener('click', () => swiper.slideTo(swiper.slides.length - 1));
  middleEl.addEventListener('click', () => swiper.slideTo(1)); // або перший середній слайд
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

    const customPagination = document.querySelector('.custom-pagination');
if (customPagination) {
  customPagination.style.display = feedbacks.length > 1 ? 'flex' : 'none';
}
    initSwiper();
  } catch (err) {
    console.error('Ошибка при загрузке фидбеков:', err);
  }
}

// Запуск после загрузки DOM
document.addEventListener('DOMContentLoaded', initFeedback);
