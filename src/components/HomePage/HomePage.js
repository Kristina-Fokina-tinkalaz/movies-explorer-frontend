import { useEffect, useState } from "react";

import mainApi from "../../utils/MainApi.js";

import Movies from '../Movies/Movies.js';
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import CurrentUserContext from '../../context/CurrentUserContext';
import { Routes, Route } from "react-router-dom";

export default Main;

function Main(props) {
  const [saveMovieOn, setSaveMovieOn] = useState(false);
    const [currentUser, setCurrentUser] = useState({
      name: "",
      email: "",
      _id: "",
    });
    useEffect(() => {
       mainApi
      .getUserData()
      .then((dataUser) => {
        setCurrentUser(dataUser);
      })
      .catch((err) => console.log(err));
    })
       function clickSaveMovie(card){
        mainApi
            .saveNewCard({card}, saveMovieOn )
            .then((newCard) => {
                console.log(newCard);
                setSaveMovieOn(true);
            })
            .catch((err) => console.log(err));
    }

  function cancelSaveMovie(){
    setSaveMovieOn(false);
  }
   

  return (

    <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={props.loggedIn}/>
        
        
        <Footer />

    </CurrentUserContext.Provider>


  );
}
