import { useState } from "react";
import { Link } from "react-router-dom";
import { NavLink } from 'react-router-dom';
import Navigate from '../Navigate/Navigate';

export default Header;


function Header(props) {
  const [overlow, setOverlow] = useState("navigate__overlow_no-active");
  function closeNavTab(){
    setOverlow("navigate__overlow_no-active");
  }
   function openNavTab(){
    setOverlow("navigate__overlow");
  }
 
  return (
    <header className="header">
      <Link to="/" className="header__logo"/>
      { (props.loggedIn) ?
      (
      <>
        <div className="header__nav-tab">
          <div className="header__links">
            <NavLink to={"/movies"} className={({isActive}) => isActive ? 'header__link header__link_active' : 'header__link'}>Фильмы</NavLink>
            <NavLink to={"/saved-movies"} className={({isActive}) => isActive ? 'header__link header__link_active' : 'header__link'}>Сохраненные фильмы</NavLink>
          </div>
          <Link to="/profile" className="header__link-account">Аккаунт</Link>
        </div>
        <button type="button" onClick={openNavTab} className="header__navigate"></button>
        <Navigate overlowClass={overlow} closeNavTab={closeNavTab} />
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
