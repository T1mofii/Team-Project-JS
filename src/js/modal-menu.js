import { getArtist } from './requests.js';
import { noDataIzT, errorApiIzT } from './izitoast.js';

const backdrop = document.getElementById('artist-modal-backdrop');
const modal = document.getElementById('artist-modal');
const closeBtn = document.getElementById('artist-close-btn');
const loader = document.getElementById('artist-loader');
const content = document.getElementById('artist-content');

let escListener = null;
let outsideClickListener = null;

// --- Відкрити модалку артиста ---
export async function openArtistModal(artistId) {
  if (!artistId) return console.error('Artist ID is missing!');
  if (!backdrop.classList.contains('hidden')) return;

  backdrop.classList.remove('hidden');
  loader.classList.remove('hidden');
  content.classList.add('hidden');
  document.body.style.overflow = 'hidden';

  try {
    const artist = await getArtist(artistId);
    if (!artist) {
      noDataIzT('artist');
      closeArtistModal();
      return;
    }

    // Використовуємо tracksList з артиста
    const tracks = artist.tracksList || [];

    // Групуємо треки за альбомами
    const albumsMap = {};
    tracks.forEach(track => {
      const albumName = track.strAlbum || 'Unknown Album';
      if (!albumsMap[albumName]) albumsMap[albumName] = [];
      albumsMap[albumName].push(track);
    });

    const albums = Object.entries(albumsMap).map(([albumName, tracks]) => ({
      strAlbum: albumName,
      tracks
    }));

    renderArtist(artist, albums);

  } catch (err) {
    console.error(err);
    content.innerHTML = `<p>Error loading artist.</p>`;
    errorApiIzT(err);
  } finally {
    loader.classList.add('hidden');
    content.classList.remove('hidden');
  }

  addEventListeners();
}

// --- Закрити модалку ---
export function closeArtistModal() {
  backdrop.classList.add('hidden');
  document.body.style.overflow = '';
  removeEventListeners();
}

// --- Слухачі ---
function addEventListeners() {
  if (!escListener) {
    escListener = (e) => { if (e.key === 'Escape') closeArtistModal(); };
    document.addEventListener('keydown', escListener);
  }

  if (!outsideClickListener) {
    outsideClickListener = (e) => { if (e.target === backdrop) closeArtistModal(); };
    backdrop.addEventListener('click', outsideClickListener);
  }
}

function removeEventListeners() {
  if (escListener) { document.removeEventListener('keydown', escListener); escListener = null; }
  if (outsideClickListener) { backdrop.removeEventListener('click', outsideClickListener); outsideClickListener = null; }
}

// --- Рендер артиста та альбомів ---
function renderArtist(artist, albums) {
    const yearsActive = artist.intFormedYear
        ? artist.intDiedYear && artist.intDiedYear !== "null"
            ? `${artist.intFormedYear} - ${artist.intDiedYear}`
            : `${artist.intFormedYear} - present`
        : 'information missing';

    content.innerHTML = `
  <h2 class="artist-title">${artist.strArtist}</h2>

  <div class="artist-header">
    <img src="${artist.strArtistThumb || ''}" alt="${artist.strArtist}">
    <div class="artist-header-content">
      <div class="artist-info-grid-two-columns">
        ${yearsActive ? `<div class="info-item"><b>Years active:</b> <p>${yearsActive}</p></div>` : ''}
        ${artist.strGender ? `<div class="info-item"><b>Sex:</b> <p>${artist.strGender}</p></div>` : ''}
        ${artist.intMembers ? `<div class="info-item"><b>Members:</b> <p>${artist.intMembers}</p></div>` : ''}
        ${artist.strCountry ? `<div class="info-item"><b>Country:</b> <p>${artist.strCountry}</p></div>` : ''}
      </div>

      ${(artist.genres && artist.genres.length) ? `
        <div class="genres-container">
          <div class="genres-list">
            ${artist.genres.map(genre => `<span class="genre-tag">${genre}</span>`).join('')}
          </div>
        </div>
      ` : ''}

      ${artist.strBiographyEN ? `
        <div class="biography-text">
          <b>Biography</b> 
          <p>${artist.strBiographyEN}</p>
        </div>
      ` : ''}
    </div>
  </div>

  <div class="albums">
    <h3>Albums</h3>
    ${albums.length ? `
      <div class="albums-grid">
        ${albums.map(album => `
          <div class="album">
            <div class="album-title">${album.strAlbum || '—'}</div>
            ${album.tracks && album.tracks.length ? `
              <div class="tracks">
                <div class="track track-header" style="font-size: 8px !important">
                  <span style="font-size: 8px">Track</span>
                  <span style="font-size: 8px">Time</span>
                  <span style="font-size: 8px">Link</span>
                </div>
                ${album.tracks.map(track => `
                  <div class="track">
                    <span>${track.strTrack || '—'}</span>
                    <span>${msToMinSec(track.intDuration)}</span>
                    <span>
                      ${track.movie ? `
                        <a href="${track.movie}" target="_blank" class="yt-link">
                          <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.5933 2.4159C20.4794 1.9933 20.2568 1.6079 19.9477 1.29807C19.6386 0.988229 19.2537 0.764759 18.8313 0.649898C17.2653 0.219898 11.0003 0.212898 11.0003 0.212898C11.0003 0.212898 4.73633 0.205898 3.16933 0.616898C2.74725 0.737045 2.36315 0.963675 2.0539 1.27503C1.74464 1.58639 1.52062 1.97202 1.40333 2.3949C0.99033 3.9609 0.98633 7.2089 0.98633 7.2089C0.98633 7.2089 0.98233 10.4729 1.39233 12.0229C1.62233 12.8799 2.29733 13.5569 3.15533 13.7879C4.73733 14.2179 10.9853 14.2249 10.9853 14.2249C10.9853 14.2249 17.2503 14.2319 18.8163 13.8219C19.2388 13.7072 19.6241 13.4843 19.934 13.1751C20.2439 12.8659 20.4677 12.4811 20.5833 12.0589C20.9973 10.4939 21.0003 7.2469 21.0003 7.2469C21.0003 7.2469 21.0203 3.9819 20.5933 2.4159ZM8.99633 10.2179L9.00133 4.2179L14.2083 7.2229L8.99633 10.2179Z" fill="white"/>
                          </svg>
                        </a>
                      ` : '-'}
                    </span>
                  </div>
                `).join('')}
              </div>
            ` : '<p class="no-tracks">No tracks available</p>'}
          </div>
        `).join('')}
      </div>
    ` : '<p class="no-albums">No albums available.</p>'}
  </div>
`;

    // --- Хелпер для конвертації мілісекунд у хв:сек ---
    function msToMinSec(ms) {
        if (!ms) return '-';
        const totalSec = Math.floor(ms / 1000);
        const minutes = Math.floor(totalSec / 60);
        const seconds = totalSec % 60;
        return `${minutes}:${seconds.toString().padStart(2, '0')}`;
    }

    // --- Кнопка закриття ---
    closeBtn.addEventListener('click', closeArtistModal);
}