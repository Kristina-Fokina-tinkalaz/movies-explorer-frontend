import saveButton from '../../images/save9.svg';
import saveButtonNone from '../../images/save.svg';
import deleteButton from '../../images/d9.svg';
import { useEffect, useContext, useState } from 'react';
import { CurrentMovie } from '../../context/CurrentMovie';

function MoviesCard(props){
    const currentMovie = useContext(CurrentMovie);
    const [onSave, setOnSave] = useState(false);
    


    useEffect(()=>{
        currentMovie.map((movie) => {
            if (movie.movieId === props.movieId){
                setOnSave(true);
            }
    })

    }, [currentMovie, props.movieId])

    function handleClickSaveMovie(){
        props.clickSaveMovie(props.movie);
        setOnSave(true);  
    }
    function cancelSaveMovie(){
       
        props.clickCancelSaveMovie(props.movie);
         setOnSave(false);  
    }
    
   
        let newTime = '';
        if (props.time < 60){
            newTime = `${props.time}м`;
        } else {
            newTime = `${Math.floor(props.time/60)}ч ${props.time - (Math.floor(props.time/60) * 60)}м`;
        }
        
    
   

    return(
        <div className="movies-card" id={props.movieId}>
            <h2 className="movies-card__header">{props.header}</h2>
            <span className="movies-card__time">{newTime}</span>
            <a href={props.trailerLink} target="_blank" rel="noreferrer">
                <img className="movies-card__img" src={props.img} alt={props.img_alt} />
            </a>
            { props.savePage
            ?
            (
            <img onClick={cancelSaveMovie} className="movies-card__button" src={deleteButton} alt="delete-button" />
            ) : (
            <img onClick={onSave ? cancelSaveMovie : handleClickSaveMovie } className={onSave ? "movies-card__button" : "movies-card__button_none"} src={onSave ? saveButton : saveButtonNone} alt="save-button" />
            ) 
            }
            
        </div>
    )
}
export default MoviesCard;