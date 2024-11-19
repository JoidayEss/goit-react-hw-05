import s from "./Error.module.css";

const Error = ({ status, message }) => {
  return (
    <div>
      <p className={s.error}>{status}</p>
      <p className={s.error}>{message}</p>
    </div>
  );
};

export default Error;
