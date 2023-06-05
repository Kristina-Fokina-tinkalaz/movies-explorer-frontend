import React from "react";
import { NavLink , Link} from 'react-router-dom';

export default Navigate;

function Navigate(props){
    return(
         <div className={props.overlowClass}>
          <div className="navigate">
            <div className="navigate__links">
              <NavLink to={"/"} onClick={props.closeNavTab} className={({isActive}) => isActive ? 'navigate__link navigate__link_active ' : 'navigate__link'}>Главная</NavLink>
              <NavLink to={"/movies"} onClick={props.closeNavTab} className={({isActive}) => isActive ? 'navigate__link navigate__link_active ' : 'navigate__link'}>Фильмы</NavLink>
              <NavLink to={"/saved-movies"} onClick={props.closeNavTab} className={({isActive}) => isActive ? 'navigate__link navigate__link_active ' : 'navigate__link'}>Сохраненные фильмы</NavLink>
            </div>
            <Link to="/profile" className="navigate__link-account">Аккаунт</Link>
          </div>
          
          <button type="button" className="navigate__close-button" onClick={props.closeNavTab} ></button>
        </div>
    );
}