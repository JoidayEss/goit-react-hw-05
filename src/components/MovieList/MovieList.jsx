import { Link, useLocation } from "react-router-dom";
import s from "./MovieList.module.css";

const MovieList = ({ list }) => {
  const location = useLocation();

  return (
    <div>
      <ul className={s.list_image}>
        {list.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={location}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={`${movie.title} poster`}
              />
              <div>
                <p className={s.text}>{movie.title}</p>
                <p className={s.text}>{movie.release_date}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieList;
