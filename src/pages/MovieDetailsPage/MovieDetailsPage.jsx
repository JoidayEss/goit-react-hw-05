import { useEffect, useState } from "react";
import { getMovieDetails } from "../../services/app.js";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import s from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader.jsx";
import ErrorDisplay from "../../components/ErrorMessage/ErrorMessage.jsx";

const MovieDetailsPage = () => {
  const location = useLocation();
  const { movieId } = useParams();
  const [moviesDetails, setMoviesDetails] = useState(null);
  const [loading, setLoading] = useState(null);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      setLoading(true);
      setFetchError(null);
      try {
        const data = await getMovieDetails(movieId);
        setMoviesDetails(data);
      } catch (error) {
        setFetchError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <Loader />;
  if (fetchError)
    return (
      <ErrorDisplay
        status={fetchError.response?.status}
        message={fetchError.response?.data?.status_message}
      />
    );

  return (
    <div>
      <Link to={location.state?.from || "/movies"}>
        <button className={s.button} type="button">
          Go back
        </button>
      </Link>

      {moviesDetails && (
        <div className={s.detailsContainer}>
          <img
            className={s.image}
            src={`https://image.tmdb.org/t/p/original${moviesDetails.backdrop_path}`}
            alt={moviesDetails.title}
            width={1024}
          />
          <p className={s.overview}>{moviesDetails.overview}</p>
        </div>
      )}

      <nav className={s.navigation}>
        <Link className={s.navLink} to="reviews" state={location.state}>
          Reviews
        </Link>
        <Link className={s.navLink} to="cast" state={location.state}>
          Cast
        </Link>
      </nav>

      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
