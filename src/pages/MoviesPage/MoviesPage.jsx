import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { searchMovie } from "../../services/app.js";
import Button from "../../components/Button/Button.jsx";
import MovieList from "../../components/MovieList/MovieList.jsx";
import s from "./MoviesPage.module.css";
import Loader from "../../components/Loader/Loader.jsx";
import Error from "../../components/Error/Error.jsx";

const MoviesPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movieList, setMovieList] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newQuery = e.target.elements.query.value.toLowerCase().trim();
    if (!newQuery) return;
    setSearchParams(
      {
        query: newQuery,
        page: 1,
      },
      { replace: true }
    );
    e.target.reset();
  };

  const handlePage = (pageNumber) => {
    setMovieList(null);
    setSearchParams({
      query: searchParams.get("query"),
      page: pageNumber,
    });
  };

  useEffect(() => {
    const currentQuery = searchParams.get("query");
    const currentPage = parseInt(searchParams.get("page"));

    if (!currentQuery) return;
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const filteredMovie = await searchMovie(currentQuery, currentPage);
        setMovieList(filteredMovie);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [searchParams]);

  return (
    <div>
      <form className={s.form} onSubmit={handleSubmit}>
        <input className={s.input} type="text" name="query" />
        <button className={s.button} type="submit">
          Search
        </button>
      </form>

      {isLoading && <Loader />}
      {error && <p>Error: {error.message}</p>}

      {movieList && (
        <>
          <Button handlePage={handlePage} movieList={movieList} />
          <MovieList list={movieList.results} />{" "}
        </>
      )}
      {error && (
        <Error
          status={error.response?.status}
          message={error.response?.data?.status_message}
        />
      )}
    </div>
  );
};

export default MoviesPage;
