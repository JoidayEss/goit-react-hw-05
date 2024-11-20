import { useEffect, useState } from "react";
import { getTrendingMovies } from "../../services/app.js";
import MovieList from "../../components/MovieList/MovieList.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import ErrorDisplay from "../../components/ErrorMessage/ErrorMessage.jsx";
import s from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchTrendingMovies = async () => {
    setLoading(true);
    setError(null);
    try {
      const trendingData = await getTrendingMovies();
      setMovies(trendingData);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTrendingMovies();
  }, []);

  return (
    <div>
      {loading && <Loader />}
      {error && (
        <ErrorDisplay
          status={error.response?.status}
          message={error.response?.data?.status_message}
        />
      )}
      {movies && !error && (
        <>
          <h2 className={s.title}>Top Trending Movies</h2>
          <MovieList list={movies.results} />
        </>
      )}
    </div>
  );
};

export default HomePage;
