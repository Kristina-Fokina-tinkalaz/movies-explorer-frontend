import saveButton from '../../images/save9.svg';
import deleteButton from '../../images/d9.svg';

function MoviesCard(props){
    return(
        <div className="movies-card">
            <h2 className="movies-card__header">{props.header}</h2>
            <span className="movies-card__time">{props.time}</span>
            <img className="movies-card__img" src={props.img} alt={props.img_alt} />
            { props.savePage
            ?
            (
            <img className="movies-card__delete-button" src={deleteButton} alt="delete-button" />
            ) : (
            <img className={!props.saveMovie ? "movies-card__save-card-button-none" : "movies-card__save-card-button"} src={saveButton} alt="save-button" />
            ) 
            }
            
        </div>
    )
}
export default MoviesCard;