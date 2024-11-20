import axios from "axios";

const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWZlYzBjYWI2MDQ4YjFkZGFiN2Q1NzlmMjJmNzBhMyIsIm5iZiI6MTczMTY4ODYyMi44Njg2NTEsInN1YiI6IjY3Mzc3NmIzNDhlOWQyY2YwMWE4YWZiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3vpwFMYyPd5cp-qCF2evnb827dQMxaHScMIvsuRramQ";
const BASE_URL = "https://api.themoviedb.org/3/";

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    Accept: "application/json",
  },
});

export const getTrendingMovies = async (pageNumber = 1) => {
  const response = await apiClient.get(`trending/movie/day`, {
    params: {
      language: "en-US",
      include_adult: false,
      page: pageNumber,
    },
  });
  return response.data;
};

export const getMovieDetails = async (movieId) => {
  const response = await apiClient.get(`movie/${movieId}`);
  return response.data;
};

export const getMovieReviews = async (movieId, page = 1) => {
  const response = await apiClient.get(`movie/${movieId}/reviews`, {
    params: { page },
  });
  return response.data;
};

export const getMovieCredits = async (movieId) => {
  const response = await apiClient.get(`movie/${movieId}/credits`);
  return response.data;
};

export const searchMovies = async (searchQuery, pageNumber = 1) => {
  if (!searchQuery) {
    console.warn("Empty search query!");
    return;
  }
  const response = await apiClient.get(`search/movie`, {
    params: {
      query: searchQuery,
      include_adult: false,
      page: pageNumber,
    },
  });
  return response.data;
};
