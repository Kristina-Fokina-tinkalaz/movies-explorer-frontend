import deleteButton from '../../../images/d9.png';

function MoviesCard(props){
    return(
        <div className="movies-card">
            <h2 className="movies-card__header">{props.header}</h2>
            <span className="movies-card__time">{props.time}</span>
            <img className="movies-card__img" src={props.img} alt={props.img_alt} />
            <img className="movies-card__delete-button" src={deleteButton} alt="delete-button" />
        </div>
    )
}
export default MoviesCard;