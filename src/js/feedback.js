import Swiper from 'swiper/bundle';
import 'swiper/css';
import 'swiper/css/bundle'; // навигация и пагинация
import { getFeedbackByQuery } from './requests.js';

// === Swiper ===
const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: false,
  slidesPerView: 1,
  spaceBetween: 20,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});

// === Контейнер для слайдов ===
const feedbackWrapper = document.querySelector('.swiper-wrapper');

// ================= Функция генерации звезд =================
function renderStars(rating) {
  const fullStars = Math.round(rating);
  const maxStars = 5;
  let starsHTML = '';
  for (let i = 1; i <= maxStars; i++) {
    starsHTML += i <= fullStars ? '★' : '☆';
  }
  return starsHTML;
}

// ================= Рендер слайдов =================
function renderFeedbackSlides(feedbacks) {
  if (!feedbacks || feedbacks.length === 0) return;

  const markup = feedbacks
    .map(
      ({ rating, descr, name }) => `
      <div class="swiper-slide">
        <div class="feedback-value">
          <div class="stars">${renderStars(rating)}</div>
          <div class="review">
            <p>${descr}</p>
          </div>
          <div class="author">
            <p>${name}</p>
          </div>
        </div>
      </div>`
    )
    .join('');

  feedbackWrapper.innerHTML = markup;
  swiper.update();
}

// ================= INIT =================
async function initFeedback() {
  try {
    // Получаем первую страницу отзывов
    const feedbacks = await getFeedbackByQuery(10, 1);
    renderFeedbackSlides(feedbacks);
  } catch (err) {
    console.error('Ошибка при загрузке фидбеков:', err);
  }
}

initFeedback();
