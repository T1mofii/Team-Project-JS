import axios from 'axios';
import {
  errorApiIzT,
  noDataIzT,
  successDataIzT,
} from './izitoast.js';

axios.defaults.baseURL = 'https://sound-wave.b.goit.study/api/';
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
export async function getArtists({ name, page = 1, sortName, genre } = {}) {
  const params = {
    limit: 8,
    page,
    ...(name && { name }),
    ...(sortName && { sortName }),
    ...(genre && { genre }),
  };

  const data = await fetchData('artists', params);
  if (!data) return [];

  const artists = data.artists || [];
  MAX_PAGE_ARTIST = Math.ceil((data.totalArtists || artists.length) / params.limit);

  if (artists.length === 0) {
    noDataIzT('artists');
    return [];
  }

  return artists;
}

export async function getArtistAlbums(id) {
  if (!id) return [];
  const data = await fetchData(`artists/${id}/albums`);
  if (!data) return [];
  return data.albumsList || [];
}

export async function getArtist(id) {
  if (!id) return null;
  const artist = await fetchData(`artists/${id}`);
  if (!artist) {
    noDataIzT('artist');
    return null;
  }
  return artist;
}

export async function getAlbumTracks(albumId) {
  if (!albumId) return [];
  const data = await fetchData(`albums/${albumId}/tracks`);
  if (!data) return [];
  return data.tracks || [];
}

// ================= FEEDBACKS =================
export async function getFeedbackByQuery(limit = 10, page = 1) {
  const data = await fetchData('feedbacks', { limit, page });
  if (!data || !data.data) {
    noDataIzT('feedbacks');
    return [];
  }

  const feedbacks = data.data;
  if (feedbacks.length === 0) {
    noDataIzT('feedbacks');
    return [];
  }

  return feedbacks;
}

export async function getRandomPageFeedbacks() {
  const firstPage = await fetchData('feedbacks', { limit: 1, page: 1 });
  if (!firstPage) return [];

  const total = firstPage.total || 1;
  const page = getRandomInt(Math.ceil(total / 10));
  return await getFeedbackByQuery(10, page);
}

export async function postFeedback(nameArtist, ratingArtist, descArtist) {
  if (!nameArtist || !ratingArtist) return;

  const newFeedback = {
    name: nameArtist,
    rating: ratingArtist,
    descr: descArtist,
  };

  try {
    const response = await axios.post('feedbacks', newFeedback);
    successDataIzT(response.data);
  } catch (error) {
    errorApiIzT(error);
  }
}
