// Imports
import axios from "axios";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import { getArtistAlbums } from './requests.js';
import { openArtistModal } from './modal-menu.js'; // Импортируем функцию открытия модалки

// Search Elements
const refs = {
    cardItem: document.querySelector('.js-artist-card'),
    loader: document.querySelector('.js-artist-loader'),
    btnLoadMore: document.querySelector('.js-artist-loadmore-btn'),
}

// Function on Api
async function getArtistForQuery(page) {
  const res = await axios.get('https://sound-wave.b.goit.study/api/artists', { 
    params: { page:page, limit:8, } 
  });
    return res.data;
}

// Slice function
function truncateText(text, maxLength) {
  if (!text) return '';
  return text.length > maxLength ? text.slice(0, maxLength) + '...' : text;
}

// Render Function
function createArtists(artists) {
    let markup = artists.map(artist => {
        const genresMarkup = artist.genres
            ? artist.genres.map(genre => `<li class="item-info-genre">${genre}</li>`).join('')
            : '';
        let maxLength;
        if (window.innerWidth < 320) {
            maxLength = 64; 
        } else if (window.innerWidth < 768) {
            maxLength = 64; 
        } else if (window.innerWidth < 1440) {
            maxLength = 160; 
        } else {
            maxLength = 139; 
        }
    const shortBio = truncateText(artist.strBiographyEN, maxLength);
        
       return `<li class="artist-card-item">
                <img class="artist-card-img" src="${artist.strArtistThumb}" alt="${artist.strArtist}" >
                <ul class="artist-item-info">
                    ${genresMarkup}
                </ul>
                <div class="artist-info-container">
                    <h4 class="card-item-title">${artist.strArtist}</h4>
                    <p class="card-item-info">
                         ${shortBio}
                    </p>
                </div>
                <div class="btn-learn-more-cont">
                    <button type="button" class="artist-learn-btn" data-artist-id="${artist._id}">Learn More </button>
                    <svg width="8" height="15" viewBox="0 0 8 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M0 14.5492L8 7.54919L0 0.549194V14.5492Z" fill="white" />
                    </svg>
                </div>
            </li>`;
    }).join('');
    return markup;
    
}

// НОВАЯ ФУНКЦИЯ: Вставка карточек в DOM
function renderArtistsToDOM(artistsMarkup) {
    if (!refs.cardItem) {
        console.error('Container .js-artist-card not found');
        return;
    }
    refs.cardItem.innerHTML = artistsMarkup;
}

// Functions
function showLoader() {
    if (refs.loader) {
        refs.loader.classList.add('is-active-loader');
    }
}

function hideLoader() {
    if (refs.loader) {
        refs.loader.classList.remove('is-active-loader');
    }
}

function showLoadMoreButton() {
    refs.btnLoadMore.disabled = false;
    refs.btnLoadMore.classList.add('artist-load-more-btn-is-active');
}

function hideLoadMoreButton() {
    refs.btnLoadMore.disabled = true;
    refs.btnLoadMore.classList.remove('artist-load-more-btn-is-active');
}

// Функция для обработки клика на кнопку Learn More
async function handleLearnMoreClick(event) {
    const learnMoreBtn = event.target.closest('.artist-learn-btn');
    if (!learnMoreBtn) return;
    
    const artistId = learnMoreBtn.dataset.artistId;
    const artistName = learnMoreBtn.closest('.artist-card-item').querySelector('.card-item-title').textContent;
    
    if (!artistId) {
        iziToast.error({
            message: 'Artist ID not found'
        });
        return;
    }
    
    console.log('Opening modal for artist:', artistName, 'ID:', artistId);
    
    try {
        // Показываем лоадер на кнопке
        const originalText = learnMoreBtn.textContent;
        learnMoreBtn.disabled = true;
        learnMoreBtn.textContent = 'Loading...';
        
        // ВАЖНО: используем вашу существующую функцию openArtistModal
        await openArtistModal(artistId);
        
    } catch (error) {
        console.error('Error opening modal:', error);
        iziToast.error({
            message: 'Failed to open artist details. Please try again.'
        });
    } finally {
        // Восстанавливаем кнопку
        learnMoreBtn.disabled = false;
        learnMoreBtn.textContent = 'Learn More';
    }
}

let currentPage;
let maxPage = 0;
const pageSize = 8;

// Слухач на завантаження сторінки для відображення стрічки артистів.
document.addEventListener('DOMContentLoaded', async () => {
    currentPage = 1;
    showLoader();
    try {
        const res = await getArtistForQuery(currentPage);
        const arrOfArtist = res.artists;
        const markup = createArtists(arrOfArtist);
        
        // ВСТАВЛЯЕМ разметку в DOM - ЭТО ГЛАВНОЕ ИСПРАВЛЕНИЕ
        renderArtistsToDOM(markup);

        // Добавляем обработчик кликов на карточки
        refs.cardItem.addEventListener('click', handleLearnMoreClick);

        maxPage = Math.ceil(res.totalArtists / pageSize);
        if (currentPage < maxPage) {
            showLoadMoreButton();
        } else {
            hideLoadMoreButton();
            iziToast.error({
                message: "We're sorry, but you've reached the end of search results."
            });
        }
        
    } catch (error) {
        console.error('Error loading artists:', error);
        maxPage = 0;
        iziToast.error({
            message: 'Sorry. Please try again!'
        });
    } finally {
        hideLoader();
    }
});

// Слухач на додаткове завантаження сторінки для відображення стрічки артистів.
refs.btnLoadMore.addEventListener('click', async () => {
    currentPage += 1;
    hideLoadMoreButton();
    showLoader();
    try {
        const res = await getArtistForQuery(currentPage);

        if (!res.artists.length) {
            iziToast.info({
                message: "Sorry. Please try again!"
            });
            return;
        }
        const arrOfArtist = res.artists;
        const markup = createArtists(arrOfArtist);
        
        // ВСТАВЛЯЕМ новую разметку в конец существующей
        refs.cardItem.insertAdjacentHTML('beforeend', markup);

        const firstCard = document.querySelector('.artist-card-item');
        if (!firstCard) return;
        const cardHeight = firstCard.getBoundingClientRect().height;
        window.scrollBy({
            top: cardHeight * 2,
            behavior: "smooth"
        });
    } catch (error) {
        console.error('Error loading more artists:', error);
        iziToast.error({
            message: 'Sorry, there are no information. Please try again!'
        });
    } finally {
        hideLoader();
        if (currentPage < maxPage) {
            showLoadMoreButton();
        } else {
            hideLoadMoreButton();
            iziToast.error({
                message: "We're sorry, but you've reached the end of search results."
            });
        }
    }
});