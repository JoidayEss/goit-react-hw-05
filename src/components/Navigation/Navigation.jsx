import { NavLink } from "react-router-dom";
import s from "./Navigation.module.css";
import { BiMoviePlay } from "react-icons/bi";
import { CiSearch } from "react-icons/ci";
import clsx from "clsx";

const Navigation = () => {
  const buildLinkClass = ({ isActive }) => {
    return clsx(s.link, isActive && s.active);
  };

  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <NavLink className={buildLinkClass} to="/">
          <BiMoviePlay className={s.icon} />
          HomePage
        </NavLink>
        <NavLink className={buildLinkClass} to="/movies">
          <CiSearch className={s.icon} />
          MoviesSearch
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
