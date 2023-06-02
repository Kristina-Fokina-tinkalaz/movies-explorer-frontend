import SearchForm from "./SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import movies from "../../utils/movies";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function Movies(props){
    return(
        <>
        <Header isLoggin={props.isLoggin}/>
        <div className="movies">
            <SearchForm />
            <MoviesCardList movies={movies} buttonMore={props.buttonMore} />
        </div>
        <Footer />
        </>
    )
}
export default Movies;