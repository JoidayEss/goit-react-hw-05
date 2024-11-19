import { useEffect, useState } from "react";
import { fetchTrendingMovies } from "../../services/app.js";
import MovieList from "../../components/MovieList/MovieList.jsx";
import Loader from "../../components/Loader/Loader.jsx";
import Error from "../../components/Error/Error.jsx";
import s from "./HomePage.module.css";

const HomePage = () => {
  const [list, setList] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await fetchTrendingMovies();
        setList(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, []);

  return (
    <div>
      {list && !error && <h2 className={s.title}>Top Trending movies</h2>}
      {!list && !error && <div></div>}
      {list && !error && <MovieList list={list.results} />}
      {isLoading && <Loader />}
      {error && (
        <Error
          status={error.response?.status}
          message={error.response?.data?.status_message}
        />
      )}
    </div>
  );
};

export default HomePage;
