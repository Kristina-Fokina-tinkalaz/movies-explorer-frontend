import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Movies(props){
    return(
        <>
        <Header isLoggin={props.isLoggin}/>
        <div className="movies">
            <SearchForm />
            <MoviesCardList movies={props.movies} buttonMore={props.buttonMore} savePage={props.savePage} />
        </div>
        <Footer />
        </>
    )
}
export default Movies;