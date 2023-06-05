import MoviesCard from "../MoviesCard/MoviesCard";

export default MoviesCardList;

function MoviesCardList(props){
    return(
        <>
        <div className="movies-cardlist">
            {props.movies.map((item) => {
                return(
                    <MoviesCard
                    header={item.header}
                    time={item.time}
                    img={item.img}
                    img_alt={item.alt}
                    saveMovie={item.saveMovie}
                    savePage={props.savePage}
                    />
                )
            })
            }
        </div>
            <div className={(props.buttonMore) ? "movies-cardlist__button-block" : "movies-cardlist__button-block_none"}>
                <button className={(props.buttonMore) ? "movies-cardlist__button" : "movies-cardlist__button_none"}>Ещё</button>
            </div>
        </>
    )
}
