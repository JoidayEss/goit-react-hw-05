import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { creditsMovie } from "../../services/app";
import s from "./MovieCast.module.css";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

const MovieCast = () => {
  const { movieId } = useParams();
  const [casts, setCasts] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await creditsMovie(movieId);
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
