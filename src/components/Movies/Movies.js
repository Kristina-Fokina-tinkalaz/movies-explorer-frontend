import React from "react";

import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { CurrentMovie } from "../../context/CurrentMovie";
import Preloader from "../Preloader/Preloader";

function Movies(props){
  
    
    return(
        <>
        <Header loggedIn={props.loggedIn}/>
       
            <CurrentMovie.Provider value={props.savedMoviesList}>
                <main className="movies">
                    <SearchForm cancelCheckSwitch={props.cancelCheckSwitch} onCheckSwitch={props.onCheckSwitch} checkedSwitch={props.checkedSwitch} handleSearch={props.handleSearch} search={props.search} handleSearchChange={props.handleSearchChange}/>
                    <Preloader isLoading={props.isLoading} />
                    <MoviesCardList
                        mainMovies={props.mainMovies}
                        buttonMore={props.buttonMore}
                        clickButtonMore={props.clickButtonMore}
                        savePage={props.savePage}
                        saveMovieOn={props.saveMovieOn}
                        clickSaveMovie={props.clickSaveMovie}
                        clickCancelSaveMovie={props.clickCancelSaveMovie}
                        onSave={props.onSave}
                        savedMoviesList={props.savedMoviesList}
                        />
                </main>
            </CurrentMovie.Provider>
        <Footer />
        </>
    )
}
export default Movies;