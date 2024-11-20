import { useEffect, useState } from "react";
import { getMovieReviews } from "../../services/app";
import { useLocation, useParams } from "react-router-dom";
import s from "./MovieReviews.module.css";
import Loader from "../Loader/Loader";
import Error from "../ErrorMessage/ErrorMessage";

const MovieReviews = () => {
  const location = useLocation();
  const movie = location.state?.movie;
  const { movieId } = useParams();
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getMovieReviews(movieId);
        if (data && data.results) {
          setReviews(data);
        } else {
          setReviews({ results: [] });
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}
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
