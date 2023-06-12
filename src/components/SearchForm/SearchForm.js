import iconSearch from "../../images/search-icon.svg";
import letSearch from "../../images/let-search.svg";
import Switch from "../Switch/Switch";

function SearchForm(props){
    return(
        <section className="search-form">
            <form className="search-form__form" method="get" onSubmit={props.handleSearch}>
                <div className="search-form__search-block">
                    <img src={iconSearch} className="search-form__img-search" alt="img-search"/>
                    <input className="search-form__input" value={props.search} onChange={props.handleSearchChange} placeholder="Фильм"/>
                    <button type="button" onClick={props.handleSearch} className="search-form__button">
                        <img className="search-form__button-img" src={letSearch} alt="let-search"></img>
                    </button>
                </div>
                <div className="search-form__slider-block">
                    <Switch checkedSwitch={props.checkedSwitch} cancelCheckSwitch={props.cancelCheckSwitch} onCheckSwitch={props.onCheckSwitch}/>
                    <span className="search-form__label">Короткометражки</span>
                </div>
            </form>
           
        </section>
    )
}
export default SearchForm;