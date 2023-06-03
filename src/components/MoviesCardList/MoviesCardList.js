import MoviesCard from "../MoviesCard/MoviesCard";



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
            <div className={(props.buttonMore) ? "movies-cardlist__button-block" : "movies-cardlist__button-block-none"}>
                <button className={(props.buttonMore) ? "movies-cardlist__button_more" : "movies-cardlist__button_more-none"}>Ещё</button>
            </div>
        </>
    )
}
export default MoviesCardList;