import axios from "axios";

const TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWZlYzBjYWI2MDQ4YjFkZGFiN2Q1NzlmMjJmNzBhMyIsIm5iZiI6MTczMTY4ODYyMi44Njg2NTEsInN1YiI6IjY3Mzc3NmIzNDhlOWQyY2YwMWE4YWZiZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.3vpwFMYyPd5cp-qCF2evnb827dQMxaHScMIvsuRramQ";
axios.defaults.baseURL = "https://api.themoviedb.org/3/";

const options = {
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    accept: "application/json",
  },
  params: {
    language: "en-US",
  },
};

const fetchTrendingMovies = async (page = 1) => {
  const response = await axios(`trending/movie/day`, {
    ...options,
    params: {
      ...options.params,
      include_adult: false,
      page,
    },
  });
  return response.data;
};

const detailsMovie = async (movieId) => {
  const response = await axios(`movie/${movieId}`, options);
  return response.data;
};

const reviewsMovie = async (movieId, page = 1) => {
  const response = await axios(`movie/${movieId}/reviews`, {
    ...options,
    params: { ...options.params, page },
  });
  return response.data;
};

const creditsMovie = async (movieId) => {
  const response = await axios(`movie/${movieId}/credits`, options);
  return response.data;
};

const searchMovie = async (query, page = 1) => {
  if (!query) return console.log("Query is empty!");
  const response = await axios(`search/movie`, {
    ...options,
    params: { ...options.params, include_adult: false, query, page },
  });
  return response.data;
};

export {
  fetchTrendingMovies,
  detailsMovie,
  reviewsMovie,
  creditsMovie,
  searchMovie,
};
