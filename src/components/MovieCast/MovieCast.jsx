import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { getMovieCredits } from "../../services/app";
import s from "./MovieCast.module.css";
import Loader from "../Loader/Loader";
import Error from "../ErrorMessage/ErrorMessage";

const MovieCast = () => {
  const { movieId } = useParams();
  const location = useLocation();
  const movie = location.state?.movie;
  const [casts, setCasts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await getMovieCredits(movieId);
        setCasts(data);
        console.log(setCasts);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    })();
  }, [movieId]);

  return (
    <div>
      {isLoading && <Loader />}
      {error && (
        <Error
          status={error.response?.status}
          message={error.response?.data?.status_message}
        />
      )}
      {casts && (
        <ul className={s.list}>
          {casts.cast.map((actor) => (
            <li key={actor.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
              />
              <p className={s.info}>&quot;{actor.character}&quot;</p>
              <p className={s.info}>{actor.name}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieCast;
