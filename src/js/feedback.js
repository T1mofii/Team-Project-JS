import axios from 'axios';
import Swiper from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import Raty from 'raty-js';

const swiper = new Swiper('.swiper', {
  direction: 'horizontal',
  loop: false,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  modules: [Navigation, Pagination],
});

const feedbackMarkup = document.querySelector('.swiper-wrapper');
const swiperButtonPrev = document.querySelector('.swiper-button-prev');
const swiperButtonNext = document.querySelector('.swiper-button-next');
let i = 0;
let dataFdb = [];

export async function getFeedbackByQuery(limit, page) {
  const BASE_URL = 'https://sound-wave.b.goit.study/api';
  const END_POINT = '/feedbacks';
  const params = new URLSearchParams({
    limit: limit,
    page: page,
  });
  const url = `${BASE_URL}${END_POINT}?${params}`;
  console.log(url);
  try {
    const res = await axios.get(url);
    return res.data.data;
  } catch (err) {
    alert(`${err}`);
    return [];
  }
}
dataFdb = await getFeedbackByQuery(10, 1);

console.log(dataFdb);
export function createSlidesFeedback(dataFdb) {
  if (!dataFdb || dataFdb.length === 0) return;

  const markup = dataFdb
    .map(
      ({ rating, descr, name }) => `
        <div class="swiper-slide">
          <div class="feedback-value">
            <div class="stars">
              <div class="raty" data-score="${Math.round(rating)}"></div>
            </div>
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
  feedbackMarkup.insertAdjacentHTML('beforeend', markup);
}

function setupCustomPagination(swiper) {
  const pagination = document.querySelector('.swiper-pagination');
  pagination.innerHTML = `
    <span class="dot left"></span>
    <span class="dot middle"></span>
    <span class="dot right"></span>
  `;

  const dots = {
    left: pagination.querySelector('.dot.left'),
    middle: pagination.querySelector('.dot.middle'),
    right: pagination.querySelector('.dot.right'),
  };

  function updatePagination() {
    const totalSlides = swiper.slides.length;
    const currentIndex = swiper.realIndex;

    Object.values(dots).forEach(dot => dot.classList.remove('active'));

    if (currentIndex < Math.ceil(totalSlides / 3)) {
      dots.left.classList.add('active');
    } else if (currentIndex < Math.ceil((totalSlides * 2) / 3)) {
      dots.middle.classList.add('active');
    } else {
      dots.right.classList.add('active');
    }
  }

  updatePagination();
  swiper.on('slideChange', updatePagination);

  dots.left.addEventListener('click', () => swiper.slideTo(0));
  dots.middle.addEventListener('click', () => swiper.slideTo(5));
  dots.right.addEventListener('click', () => {
    if (swiper.slides.length > 10) {
      swiper.slideTo(10);
    } else {
      swiper.slideTo(swiper.slides.length - 1);
    }
  });
}
function initRaty() {
  document.querySelectorAll('.raty').forEach(el => {
    new Raty(el, {
      score: el.dataset.score,
      readOnly: true,
      path: '../img',
    }).init();
  });
}

createSlidesFeedback(dataFdb);
initRaty();
swiper.update();
setupCustomPagination(swiper);
