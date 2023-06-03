import { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';

export default Header;


function Header(props) {
  const [overlow, setOverlow] = useState("header__navTab-overlow_no-active");
  function openNavTab(){
    setOverlow("header__navTab-overlow");
  }
  function closeNavTab(){
    setOverlow("header__navTab-overlow_no-active");
  }
  return (
    <header className="header">
      <Link to="/" className="header__logo"/>
      { props.isLoggin === "true" ?
      (
      <>
        <div className="header__loggin">
          <div to="" className="header__links">
            <NavLink to={"/movies"} className={({isActive}) => isActive ? 'header__link header__link_active' : 'header__link'}>Фильмы</NavLink>
            <NavLink to={"/saved-movies"} className={({isActive}) => isActive ? 'header__link header__link_active' : 'header__link'}>Сохраненные фильмы</NavLink>
          </div>
          <Link to="/profile" className="header__link-account">Аккаунт</Link>
        </div>
        <button onClick={openNavTab} className="header__button-navTab"></button>
        <div className={overlow}>
          <div className="header__navTab">
            <div className="header__navTab-links">
              <NavLink to={"/"} onClick={closeNavTab} className={({isActive}) => isActive ? 'header__navTab-link header__navTab-link_active ' : 'header__navTab-link'}>Главная</NavLink>
              <NavLink to={"/movies"} onClick={closeNavTab} className={({isActive}) => isActive ? 'header__navTab-link header__navTab-link_active' : 'header__navTab-link'}>Фильмы</NavLink>
              <NavLink to={"/saved-movies"} onClick={closeNavTab} className={({isActive}) => isActive ? 'header__navTab-link header__navTab-link_active ' : 'header__navTab-link'}>Сохраненные фильмы</NavLink>
            </div>
            <Link to="/profile" className="header__navTab-link-account">Аккаунт</Link>
          </div>
          
          <button className="header__navTab-close-button" onClick={closeNavTab} ></button>
        </div>
      </>
      )
      :
      (<div className="header__auth">
        <Link to="/signup" className="header__register">
             Регистрация
        </Link>
        <Link to="/signin" className="header__login">
            Войти
        </Link>
      </div>) }
      
    </header>
  );
}
