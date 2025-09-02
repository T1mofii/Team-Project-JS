import Swiper from 'swiper/bundle';
import 'swiper/css';
import 'swiper/css/bundle';
import { getFeedbackByQuery } from './requests.js';

// Функция генерации звезд
function renderStars(rating) {
  const fullStars = Math.round(rating);
  const maxStars = 5;
  let starsHTML = '';
  for (let i = 1; i <= maxStars; i++) {
    starsHTML += i <= fullStars ? '★' : '☆';
  }
  return `<div class="stars">${starsHTML}</div>`;
}

// Рендер слайдов
function renderFeedbackSlides(feedbacks) {
  const swiperWrapper = document.querySelector('.swiper-wrapper');
  if (!swiperWrapper) return;

  const markup = feedbacks
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

  swiperWrapper.innerHTML = markup;
}

// Инициализация Swiper с кастомной пагинацией
function initSwiper() {
  const swiper = new Swiper('.swiper', {
    direction: 'horizontal',
    loop: false,
    slidesPerView: 1,
    spaceBetween: 20,
    
    // Кастомная пагинация (3 точки)
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      type: 'custom',
      renderCustom: function(swiper, current, total) {
        const slides = swiper.slides.length;
        let activeDot = 2;
        if (swiper.realIndex === 0) activeDot = 1;
        else if (swiper.realIndex === slides - 1) activeDot = 3;

        return [1, 2, 3]
          .map(
            i =>
              `<span class="swiper-pagination-bullet${i === activeDot ? ' swiper-pagination-bullet-active' : ''}" data-index="${i}"></span>`
          )
          .join('');
      },
    },
    
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // Обработчик кликов для кастомной пагинации
  const pagination = document.querySelector('.swiper-pagination');
  if (pagination) {
    pagination.addEventListener('click', function(e) {
      if (!e.target.classList.contains('swiper-pagination-bullet')) return;
      
      const index = Number(e.target.dataset.index);
      const slides = swiper.slides.length;
      
      let slideTo = 0;
      if (index === 1) slideTo = 0;
      else if (index === 3) slideTo = slides - 1;
      else slideTo = Math.floor((slides - 1) / 2);
      
      swiper.slideTo(slideTo);
    });
  }
}

// INIT
async function initFeedback() {
  try {
    const feedbacks = await getFeedbackByQuery(10, 1);
    renderFeedbackSlides(feedbacks);
    
    // Скрываем пагинацию если слайдов меньше 2
    if (feedbacks.length <= 1) {
      document.querySelector('.swiper-pagination').style.display = 'none';
    } else {
      document.querySelector('.swiper-pagination').style.display = 'flex';
    }
    
    initSwiper();
  } catch (err) {
    console.error('Ошибка при загрузке фидбеков:', err);
  }
}


