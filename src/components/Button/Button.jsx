import s from "./Button.module.css";

const Button = ({ handlePage, movieList }) => {
  if (!movieList) {
    return <p>Loading...</p>;
  }
  return (
    <div className={s.container}>
      <button
        className={s.button}
        type="button"
        disabled={movieList.page <= 1}
        onClick={() => handlePage(movieList.page - 1)}
      >
        Back
      </button>
      <p className={s.page}>
        Page: <span>{movieList.page}</span>/{movieList.total_pages}
      </p>
      <button
        className={s.button}
        type="button"
        disabled={movieList.total_pages <= movieList.page}
        onClick={() => handlePage(movieList.page + 1)}
      >
        Next
      </button>
    </div>
  );
};

export default Button;
