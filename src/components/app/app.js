
import { Route, Routes , useNavigate, Navigate} from "react-router-dom";
import React, { useState, useEffect } from "react";
import "../../index.css";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import Auth from "../Auth/Auth";
import ErrorPage from "../ErrorPage/ErrorPage";
import InfoTooltip from "../InfoTooltip/InfoTooltip";
import * as auth from "../../utils/auth";

import imgOk from '../../images/img-ok.png';
import imgError from '../../images/img-error.png';
import Profile from "../Profile/Profile";
import mainApi from "../../utils/MainApi";
import api from "../../utils/MoviesApi";
import ProtectedRouteElement from '../ProtectedRoute/ProtectedRoute';

function App() {
 
  const [loggedIn, setLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [savedMovies, setSavedMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [mainMovies, setMainMovies] = useState([]);
  const [search, setSearch] = useState('');
  const [searchSavedMovies, setSearchSavedMovies] = useState('');
  const [isOpenInfoTooltip, setIsOpenInfoTooltip] = useState(false);
  const [textInfoTooltip, setTextInfoTooltip] = useState("");
  const [imgInfoTooltip, setImgInfoTooltip] = useState("");
  const [buttonMore, setButtonMore] = useState(false);
  const [checkedSwitch, setCheckedSwitch] = useState(false);

    useEffect(()=>{

      tokenCheck();
     

      if (loggedIn){

         mainApi
        .getUserData()
        .then((data) => {
          setUserName(data.name);
          setUserEmail(data.email);
        })
         .catch((err) => {
              setIsOpenInfoTooltip(true);
              setTextInfoTooltip(err);
              setImgInfoTooltip(imgError);
            });
    
      mainApi
        .getInitialMovies()
        .then((moviesList) => {
          setSavedMovies(moviesList);
        })
       .catch((err) => {
              setIsOpenInfoTooltip(true);
              setTextInfoTooltip(err);
              setImgInfoTooltip(imgError);
            });
            if ( localStorage.getItem('movies') !== null && mainMovies.length === JSON.parse(localStorage.getItem('movies')).length ){
                  setButtonMore(false);
                }
      }
       
      
    }, [ setSavedMovies, setUserName, setUserEmail, loggedIn, mainMovies ] );

    useEffect(()=>{
      if (loggedIn){
        if (localStorage.getItem('movies') !== null){
          showMovies();
          setSearch(localStorage.getItem('search'));
          setCheckedSwitch(JSON.parse(localStorage.getItem('checkedSwitch')));
        } 
      }
    }, [loggedIn]);

    function onCheckSwitch(){
      setCheckedSwitch(true);
    }
    function cancelCheckSwitch(){
      setCheckedSwitch(false);
    }
     function handleSearchChange(e){
        setSearch(e.target.value);
    }
    function handleSearchSavedMoviesChange(e){
        setSearchSavedMovies(e.target.value);
    }

    function handleSearchSavedMovies(e){
      e.preventDefault();
        if (searchSavedMovies === ''){
            setIsOpenInfoTooltip(true);
            setTextInfoTooltip('Нужно ввести ключевое слово');
            setImgInfoTooltip(imgError);
        }
        else {
              let result = [];
              savedMovies.map((movie) => {
                if (movie.nameRU.toLowerCase().includes(searchSavedMovies) || movie.nameEN.toLowerCase().includes(searchSavedMovies)){
                  if (checkedSwitch && movie.duration < 40){
                          result.push(movie);
                        } else if (!checkedSwitch) {
                          result.push(movie);
                        }
                  setSavedMovies(result);
                }
              })
          }
    }
    function handleSearch(e){
        e.preventDefault();
        if (search === ''){
            setIsOpenInfoTooltip(true);
            setTextInfoTooltip('Нужно ввести ключевое слово');
            setImgInfoTooltip(imgError);
        }
        else {
          setIsLoading(true);
            api.getInitialMovies()
            .then((dataMovies) => {
              setIsLoading(false);
                let result = [];
                dataMovies.map((movie) => {
                    if (movie.nameRU.toLowerCase().includes(search) || movie.nameEN.toLowerCase().includes(search)){
                        if (checkedSwitch && movie.duration < 40){
                          result.push(movie);
                        } else if (!checkedSwitch) {
                          result.push(movie);
                        }
                    }
                    
                })
                localStorage.setItem('movies', JSON.stringify(result));
                localStorage.setItem('search', search);
                localStorage.setItem('checkedSwitch', checkedSwitch);
             
                showMovies();
                
            })
            .catch((err) => {
              setIsOpenInfoTooltip(true);
              setTextInfoTooltip(err);
              setImgInfoTooltip(imgError);
            });
        }

    }
    function showMovies(){
           if (window.innerWidth > 870){
                    setMainMovies(JSON.parse(localStorage.getItem('movies')).slice(0, 12));
                    if (JSON.parse(localStorage.getItem('movies')).length > 12) {
                        setButtonMore(true);
                    } else {
                        setButtonMore(false);
                    }
                } else if (window.innerWidth > 480 && window.innerWidth <= 870){
                    setMainMovies(JSON.parse(localStorage.getItem('movies')).slice(0, 8));
                    if (JSON.parse(localStorage.getItem('movies')).length > 8) {
                        setButtonMore(true);
                    } else {
                        setButtonMore(false);
                    }
                } else {
                    setMainMovies(JSON.parse(localStorage.getItem('movies')).slice(0, 5));
                    if (JSON.parse(localStorage.getItem('movies')).length > 5) {
                        setButtonMore(true);
                    } else {
                        setButtonMore(false);
                    }
                }
    }
    function clickButtonMore(){        
         if (window.innerWidth > 870){
             setMainMovies([...mainMovies, ...JSON.parse(localStorage.getItem('movies')).slice(mainMovies.length, mainMovies.length + 3)]);
         } else if (window.innerWidth > 480 && window.innerWidth <= 870){
            setMainMovies([...mainMovies, ...JSON.parse(localStorage.getItem('movies')).slice(mainMovies.length, mainMovies.length + 2)]);
         } else {
            setMainMovies([...mainMovies, ...JSON.parse(localStorage.getItem('movies')).slice(mainMovies.length, mainMovies.length + 5)]);
         }
    }

  const navigate = useNavigate();

    const tokenCheck = () => {

    if (localStorage.getItem('jwt') !== null) {
      const jwt = localStorage.getItem("jwt");
      auth
        .checkToken(jwt)
        .then(() => {
          setLoggedIn(true);
          navigate("/movies", { replace: true });
        })
        .catch((err) => {
          console.log(`err: ` +err);
          navigate("/signin", { replace: true });
        });
    }
 
  };
 

  function handleRegister({name, email, password}) {
    return auth
      .register({name, email, password})
      .finally(() => {
        setIsOpenInfoTooltip(true);
      })
      .then(() => {
        setTextInfoTooltip("Вы успешно зарегистрировались!");
        setImgInfoTooltip(imgOk);
        handleLogin({email, password})
      })
      .catch((err) => {
        setTextInfoTooltip("Что-то пошло не так! Попробуйте ещё раз.");
        setImgInfoTooltip(imgError);
       
      });
  }
  function closeInfoTooltip() {
    if (textInfoTooltip === "Вы успешно зарегистрировались!") {
      navigate("/signin", { replace: true });
    }
    if (textInfoTooltip === "Вы успешно вошли на сайт!") {
      navigate("/movies", { replace: true });
    }
    setIsOpenInfoTooltip(false);
  }
  function handleLogin( {email, password} ) {
    return auth
      .authorize({email, password})
      .finally(() => {
        setIsOpenInfoTooltip(true);
      })
      .then((data) => {
        if (data.token) {
          setTextInfoTooltip("Вы успешно вошли на сайт!");
          setImgInfoTooltip(imgOk);
          localStorage.setItem("jwt", data.token);
          setUserEmail(data.email);
          setUserName(data.name);
          setLoggedIn(true);
        }
       
      })
      .catch((err) => {
        setTextInfoTooltip("Что-то пошло не так! Попробуйте ещё раз.");
        setImgInfoTooltip(imgError);
        console.log(err);
      });
  }
  const handleExit = () => {
    if (localStorage.getItem('movies')){
       localStorage.removeItem("movies");
    }
    if (localStorage.getItem('search')){
      localStorage.removeItem("search");
    }
    if (localStorage.getItem('checkedSwitch')){
       localStorage.removeItem("checkedSwitch");
    }
    localStorage.removeItem("jwt");
    navigate("/signin", { replace: true });
  };
function clickSaveMovie(card){
        mainApi
            .saveNewCard(card)
            .then((newCard) => {
              setSavedMovies([newCard.movie, ...savedMovies]);
            })
            .catch((err) => {
              setIsOpenInfoTooltip(true);
              setTextInfoTooltip(err);
              setImgInfoTooltip(imgError);
            });
    }
  function clickCancelSaveMovie(card){
    savedMovies.map((movie => {
      if (card.movieId === movie.movieId){
           mainApi
            .deleteCard(movie._id)
            .then(() => {
              setSavedMovies((state) => state.filter((m) => m._id != movie._id));
            })
             .catch((err) => {
              setIsOpenInfoTooltip(true);
              setTextInfoTooltip(err);
              setImgInfoTooltip(imgError);
            });
      }
    }))
  }
  function submitProfileForm(name, email){
    mainApi
    .updateProfile(name, email)
    .then((userData)=>{
      setUserEmail(userData.email);
      setUserName(userData.name);
    })
      .catch((err) => {
              setIsOpenInfoTooltip(true);
              setTextInfoTooltip(err);
              setImgInfoTooltip(imgError);
            });
  }

  return (
    <div className="main">
        <Routes>
          <Route
            path="*"
            element={
              loggedIn ? (
                <ErrorPage />
              ) : (
                <Navigate to="/signin" replace />
              )
            }
          />
            <Route
            path="/"
            element={<Main loggedIn={loggedIn} />}
            />
            <Route
            path="/profile"
            element={
              <ProtectedRouteElement 
                element={Profile}
                loggedIn={loggedIn}
                userName={userName}
                userEmail={userEmail}
                handleExit={handleExit}
                submitProfileForm={submitProfileForm}
              />
            }
            />
           <Route
                path="/movies"
                element={
                  <ProtectedRouteElement
                    element={Movies}
                    loggedIn={loggedIn}
                    savePage={false}
                    clickSaveMovie={clickSaveMovie}
                    clickCancelSaveMovie={clickCancelSaveMovie}
                    handleSearch={handleSearch}
                    search={search}
                    handleSearchChange={handleSearchChange}
                    mainMovies={mainMovies}
                    buttonMore={buttonMore}
                    clickButtonMore={clickButtonMore}
                    savedMoviesList={savedMovies}
                    isLoading={isLoading}
                    checkedSwitch={checkedSwitch}
                    cancelCheckSwitch={cancelCheckSwitch}
                    onCheckSwitch={onCheckSwitch}
                  />
                }
            />
            <Route
                path="/saved-movies"
                element={
                  <ProtectedRouteElement
                    element={Movies}
                    loggedIn={loggedIn}
                    savePage={true}
                    clickCancelSaveMovie={clickCancelSaveMovie}
                    buttonMore={false}
                    mainMovies={savedMovies}
                    savedMoviesList={savedMovies}
                    handleSearch={handleSearchSavedMovies}
                    handleSearchChange={handleSearchSavedMoviesChange}
                    search={searchSavedMovies}
                    isLoading={isLoading}
                    checkedSwitch={checkedSwitch}
                    cancelCheckSwitch={cancelCheckSwitch}
                    onCheckSwitch={onCheckSwitch}
                    />
                }
            />
       
            <Route
            path="/signup"
            element={<Auth loginPage={false} onSubmit={handleRegister}/>}
            />
            <Route
            path="/signin"
            element={<Auth loginPage={true} onSubmit={handleLogin}/>}
            />
          
        </Routes>
         <InfoTooltip
          isOpen={isOpenInfoTooltip}
          onClose={closeInfoTooltip}
          text={textInfoTooltip}
          img={imgInfoTooltip}
        />
        
       
      </div>
  );
};


export default App;
