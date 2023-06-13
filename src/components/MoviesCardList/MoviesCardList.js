
import MoviesCard from "../MoviesCard/MoviesCard";

export default MoviesCardList;

function MoviesCardList(props){

    return(
        <>
       <div className="movies-cardlist">
            {props.mainMovies.map((movie) => {
                if (props.savePage) {
                  
                    return (
                   <MoviesCard
                    key={movie._id}
                    header={movie.nameRU}
                    time={movie.duration}
                    img={movie.image}
                    img_alt={movie.nameRU}
                    trailerLink={movie.trailerLink}
                    savePage={props.savePage}
                    clickCancelSaveMovie={props.clickCancelSaveMovie}
                    movie={movie}
                    />
                )
                } else {
                    return (
                   <MoviesCard
                    key={movie.id}
                    header={movie.nameRU}
                    time={movie.duration}
                    img={"https://api.nomoreparties.co/" + movie.image.url}
                    img_alt={movie.nameEN}
                    trailerLink={movie.trailerLink}
                    savePage={props.savePage}
                    clickSaveMovie={props.clickSaveMovie}
                    clickCancelSaveMovie={props.clickCancelSaveMovie}
                    savedMoviesList={props.savedMoviesList}
                    movieId={movie.id}
                    movie={{
                        country: movie.country,
                        director: movie.director ,
                        duration: movie.duration ,
                        year: movie.year,
                        description: movie.description,
                        image: "https://api.nomoreparties.co/" + movie.image.url,
                        trailerLink: movie.trailerLink,
                        thumbnail: "https://api.nomoreparties.co/" + movie.image.formats.thumbnail.url,
                        movieId: movie.id,
                        nameRU: movie.nameRU,
                        nameEN: movie.nameEN
                    }}
                    />
                )
                }
                
            })}
        </div>
            <div className={(props.buttonMore) ? "movies-cardlist__button-block" : "movies-cardlist__button-block_none"}>
                <button onClick={props.clickButtonMore} type="button" className={(props.buttonMore) ? "movies-cardlist__button" : "movies-cardlist__button_none"}>Ещё</button>
            </div>
        </>
    )
}
