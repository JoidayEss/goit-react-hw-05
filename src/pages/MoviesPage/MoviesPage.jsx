import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovies } from "../../services/app.js";
import Button from "../../components/Button/Button.jsx";
import MovieList from "../../components/MovieList/MovieList.jsx";
import s from "./MoviesPage.module.css";
import Loader from "../../components/Loader/Loader.jsx";
import Error from "../../components/ErrorMessage/ErrorMessage.jsx";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const onSearchSubmit = (e) => {
    e.preventDefault();
    const searchValue = e.target.elements.query.value.trim().toLowerCase();
    if (searchValue) {
      setSearchParams({ query: searchValue, page: 1 }, { replace: true });
      e.target.reset();
    }
  };

  const handlePageChange = (page) => {
    setMovies(null);
    setSearchParams({ query: searchParams.get("query"), page });
  };

  useEffect(() => {
    const fetchMovies = async () => {
      const query = searchParams.get("query");
      const page = parseInt(searchParams.get("page") || 1);

      if (!query) return;

      setIsLoading(true);
      setErrorMsg(null);

      try {
        const movieResults = await searchMovies(query, page);
        setMovies(movieResults);
      } catch (error) {
        setErrorMsg(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [searchParams]);

  return (
    <div>
      <form className={s.form} onSubmit={onSearchSubmit}>
        <input className={s.input} type="text" name="query" />
        <button className={s.button} type="submit">
          Search
        </button>
      </form>

      {isLoading && <Loader />}
      {errorMsg && <p>Error: {errorMsg.message}</p>}

      {movies && (
        <>
          <Button handlePageChange={handlePageChange} movieList={movies} />
          <MovieList list={movies.results} />
        </>
      )}

      {errorMsg && (
        <Error
          status={errorMsg.response?.status}
          message={errorMsg.response?.data?.status_message}
        />
      )}
    </div>
  );
};

export default MoviesPage;
