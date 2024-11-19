import { useEffect, useState } from "react";
import { reviewsMovie } from "../../services/app";
import { useParams } from "react-router-dom";
import s from "./MovieReviews.module.css";
import Loader from "../Loader/Loader";
import Error from "../Error/Error";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        setIsLoading(true);
        setError(null);
        const data = await reviewsMovie(movieId);
        setReviews(data);
        console.log(setReviews);
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
      {reviews && (
        <ul className={s.list}>
          {reviews.results.map((review) => (
            <li className={s.item} key={review.id}>
              <p className={s.info_1}>{review.author}&quot;</p>
              <p className={s.info}>{review.content}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
