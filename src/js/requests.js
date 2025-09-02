import axios from 'axios';
import {
  errorApiIzT,
  noDataIzT,
  successDataIzT,
} from './izitoast.js';

axios.defaults.baseURL = 'https://sound-wave.b.goit.study/api/';
let DATA_PASS;
export let MAX_PAGE_ARTIST = 1;

// ================= UTILS =================
async function fetchData(endpoint, params = {}) {
  try {
    const res = await axios.get(endpoint, { params });
    return res.data;
  } catch (error) {
    errorApiIzT(error);
    return null;
  }
}

function getRandomInt(n) {
  return Math.floor(Math.random() * n) + 1;
}

// ================= ARTISTS =================
export async function getArtists({ name, page, sortName, genre } = {}) {
  DATA_PASS = 'artists';
  const params = {
    limit: 8,
    page,
    ...(name && { name }),
    ...(sortName && { sortName }),
    ...(genre && { genre }),
  };

  const data = await fetchData(DATA_PASS, params);
  if (!data) return;

  const artists = data.artists;
  MAX_PAGE_ARTIST = Math.ceil(data.totalArtists / params.limit);

  if (artists && Array.isArray(artists) && artists.length > 0) {
    return artists;
  } else {
    return noDataIzT('artists');
  }
}

export async function getArtistAlbums(id) {
  const data = await fetchData(`artists/${id}/albums`);
  if (!data) return [];
  console.log('RAW albums response:', data);
  return data.albumsList || [];
}

export async function getArtist(id) {
  DATA_PASS = `artists/${id}`;
  const artist = await fetchData(DATA_PASS);
  if (!artist) return noDataIzT('artist');
  return artist;
}

export async function getAlbumTracks(albumId) {
  const data = await fetchData(`albums/${albumId}/tracks`);
  if (!data) return [];
  console.log('RAW tracks response:', data);
  return data.tracks || [];
}

// ================= FEEDBACKS =================
export async function getFeedbackByQuery(limit = 10, page = 1) {
  const data = await fetchData('feedbacks', { limit, page });
  if (!data) return [];
  const feedbacks = data.data;
  if (feedbacks && Array.isArray(feedbacks) && feedbacks.length > 0) {
    return feedbacks;
  } else {
    return noDataIzT('feedbacks');
  }
}

export async function getRandomPageFeedbacks() {
  const firstPage = await getFeedbackByQuery(1, 1);
  if (!firstPage) return [];

  // Если API возвращает total, используем его, иначе берем длину первого запроса
  const total = firstPage.total || firstPage.length;
  const page = getRandomInt(Math.ceil(total / 10));
  return await getFeedbackByQuery(10, page);
}

export async function postFeedback(nameArtist, ratingArtist, descArtist) {
  const newFeedback = {
    name: nameArtist,
    rating: ratingArtist,
    descr: descArtist,
  };

  try {
    const response = await axios.post('feedbacks', newFeedback);
    successDataIzT(response);
  } catch (error) {
    errorApiIzT(error);
  }
}
