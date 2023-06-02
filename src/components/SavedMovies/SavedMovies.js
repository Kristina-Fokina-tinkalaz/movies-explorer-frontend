import SearchForm from "../Movies/SearchForm/SearchForm";
import MoviesCardList from "./MoviesCardList/MoviesCardList";
import saveMovies from "../../utils/save-movies";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";

function SavedMovies(props){
    return(
        <>
        <Header isLoggin={props.isLoggin} />
        <div className="movies">
            <SearchForm />
            <MoviesCardList movies={saveMovies} />
        </div>
        <Footer />
        </>
    )
}
export default SavedMovies;