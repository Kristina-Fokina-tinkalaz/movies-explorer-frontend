import iconSearch from "../../images/search-icon.svg";
import letSearch from "../../images/let-search.svg";

function SearchForm(){
    return(
        <div className="search-form">
            <from className="search-form__form" method="get">
                <div className="search-form__search-block">
                    <img src={iconSearch} className="search-form__img-search" alt="img-search"/>
                    <input className="search-form__input" placeholder="Фильм"/>
                    <button className="search-form__button">
                        <img className="search-form__button-img" src={letSearch} alt="let-search"></img>
                    </button>
                </div>
                <div className="search-form__slider-block">
                    <label class="switch">
                        <input className="switch__checkbox" type="checkbox" /> 
                        <span className="switch__slider"></span>
                    </label>
                    <span className="search-form__label">Короткометражки</span>
                </div>
            </from>
        </div>
    )
}
export default SearchForm;