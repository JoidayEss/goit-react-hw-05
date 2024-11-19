import { useEffect, useState } from "react";
import { detailsMovie } from "../../services/app.js";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import s from "./MovieDetailsPage.module.css";
import Loader from "../../components/Loader/Loader.jsx";
import Error from "../../components/Error/Error.jsx";

const MovieDetailsPage = () => {
  const location = useLocation();
  const { movieId } = useParams();
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await detailsMovie(movieId);
        setDetails(data);
        console.log(setDetails);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [movieId]);

  if (isLoading) return <p>Loading.....</p>;
  if (error) return <p>Something went wrong: {error.message}</p>;

  return (
    <>
      <div>
        {isLoading && <Loader />}
        <Link to="/">
          <button className={s.button} type="button">
            Back
          </button>
        </Link>
        {details && (
          <>
            <img
              className={s.img}
              src={`https://image.tmdb.org/t/p/original${details.backdrop_path}`}
              alt={details.title}
              width={1024}
            />
            <p className={s.overview}>{details.overview}</p>
          </>
        )}
      </div>
      <div>
        <nav className={s.nav}>
          <Link className={s.details} to="reviews" state={location.state}>
            Reviews
          </Link>
          <Link className={s.details} to="cast" state={location.state}>
            Cast
          </Link>
        </nav>
        <Outlet />
        {error && (
          <Error
            status={error.response?.status}
            message={error.response?.data?.status_message}
          />
        )}
      </div>
    </>
  );
};

export default MovieDetailsPage;
