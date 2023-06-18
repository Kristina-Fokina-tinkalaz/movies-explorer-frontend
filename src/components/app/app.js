
import { Route, Routes , useNavigate, Navigate } from "react-router-dom";
import React, { useState, useEffect } from "react";

import "../../index.css";

import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
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
import { windowWidthSmall, windowWidthBig, durationShortMovie, textErrorSearch, textErrorSearchNotFound, textErrorSearchSavedMovie, textErrorServerSearch, sumMoviesOnBigWidth, sumMoviesOnMediumWidth, sumMoviesOmSmallWidth, addMoviesOnBigWigth, addMoviesOnMediumWigth, addMoviesOnSmallWigth, textRegisterOk, textRegisterError, textLoginOk, textUpdateOk } from "../../utils/constants";

function App() {
 
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') || false);
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
  const [errorTextMovie, setErrorTextMovie] = useState('');
  const [isErrorTextMovie, setIsErrorTextMovie] = useState(false);
  const [errorTextSavedMovie, setErrorTextSavedMovie] = useState('');
  const [isErrorTextSavedMovie, setIsErrorTextSavedMovie] = useState(false);
  const [shortMovies, setShortMovies] = useState([]);

    tokenCheck();

    useEffect(()=>{
      
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
          localStorage.setItem('saved-movies', JSON.stringify(moviesList));
        })
       .catch((err) => {
              setIsOpenInfoTooltip(true);
              setTextInfoTooltip(err);
              setImgInfoTooltip(imgError);
            });

      if ( localStorage.getItem('movies') !== null && mainMovies.length === JSON.parse(localStorage.getItem('movies')).length ){
          setButtonMore(false);
        }
       
        console.log()
        if (mainMovies === shortMovies && localStorage.getItem('short-movies') !== null && mainMovies.length === JSON.parse(localStorage.getItem('short-movies').length)){
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
      if (JSON.parse(localStorage.getItem('movies')) !== null){
      let result =[];
      JSON.parse(localStorage.getItem('movies')).map((movie) => {
        if (movie.duration < durationShortMovie){
          result.push(movie);
        }
      })
      setMainMovies(result);
      localStorage.setItem('short-movies', JSON.stringify(result));
      setShortMovies(result);
    }

    }
    function cancelCheckSwitch(){
      setCheckedSwitch(false);
      setMainMovies(JSON.parse(localStorage.getItem('movies')));
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
            setTextInfoTooltip(textErrorSearch);
            setImgInfoTooltip(imgError);
        }
        else {
              if (localStorage.getItem('saved-movies') !== null){
                   let result = [];
              JSON.parse(localStorage.getItem('saved-movies')).map((movie) => {
                if (movie.nameRU.toLowerCase().includes(searchSavedMovies) || movie.nameEN.toLowerCase().includes(searchSavedMovies)){
                  if (!checkedSwitch){
                    result.push(movie);
                  } else if (movie.duration < durationShortMovie){ 
                    result.push(movie);
                  }
                } 
                setSavedMovies(result);
                setIsErrorTextSavedMovie(false);
                setErrorTextSavedMovie('');

                if (result.length === 0){
                  setSavedMovies(result);
                  setIsErrorTextSavedMovie(true);
                  setErrorTextSavedMovie(textErrorSearchNotFound);
                }
              }
              )
              } else {
                setIsErrorTextSavedMovie(true);
                setErrorTextSavedMovie(textErrorSearchSavedMovie);
              }
           
          }
    }
    function handleSearch(e){
        e.preventDefault();
        if (search === ''){
            setIsOpenInfoTooltip(true);
            setTextInfoTooltip(textErrorSearch);
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
                        if (checkedSwitch && movie.duration < durationShortMovie){
                          result.push(movie);
                        } else if (!checkedSwitch) {
                          result.push(movie);
                        }
                    }
                    
                })
                localStorage.setItem('movies', JSON.stringify(result));
                localStorage.setItem('search', search);
                localStorage.setItem('checkedSwitch', checkedSwitch);
                console.log(dataMovies);
                showMovies();
                if (result.length === 0){
                    setIsErrorTextMovie(true);
                    setErrorTextMovie(textErrorSearchNotFound);
                }
                else {
                  setIsErrorTextMovie(false);
                  setErrorTextMovie('');
                }
            })
            .catch(() => {
              setIsOpenInfoTooltip(true);
              setTextInfoTooltip(textErrorServerSearch);
              setImgInfoTooltip(imgError);
            });
        }

    }
    function showMovies(){
           if (checkedSwitch === true){
          show(JSON.parse(localStorage.getItem('short-movies')));
      } else {
          show(JSON.parse(localStorage.getItem('movies')));
      }

      function show(mainMoviesFromStorage){
           if (window.innerWidth > windowWidthBig){
                    setMainMovies(mainMoviesFromStorage.slice(0, sumMoviesOnBigWidth));
                    if (mainMoviesFromStorage.length > sumMoviesOnBigWidth) {
                        setButtonMore(true);
                    } else {
                        setButtonMore(false);
                    }
                } else if (window.innerWidth > windowWidthSmall && window.innerWidth <= windowWidthBig){
                    setMainMovies(mainMoviesFromStorage.slice(0, sumMoviesOnMediumWidth));
                    if (mainMoviesFromStorage.length > sumMoviesOnMediumWidth ) {
                        setButtonMore(true);
                    } else {
                        setButtonMore(false);
                    }
                } else {
                    setMainMovies(mainMoviesFromStorage.slice(0, sumMoviesOmSmallWidth));
                    if (mainMoviesFromStorage.length > sumMoviesOmSmallWidth) {
                        setButtonMore(true);
                    } else {
                        setButtonMore(false);
                    }
                }
      }

                  
    }
    function clickButtonMore(){
      if (checkedSwitch === true){
          clickButton(JSON.parse(localStorage.getItem('short-movies')));
      } else {
          clickButton(JSON.parse(localStorage.getItem('movies')));
      }
        function clickButton(moviesList){
              if (window.innerWidth > windowWidthBig){
                setMainMovies([...mainMovies, ...moviesList.slice(mainMovies.length, mainMovies.length + addMoviesOnBigWigth)]);
            } else if (window.innerWidth > windowWidthSmall && window.innerWidth <= windowWidthBig){
                setMainMovies([...mainMovies, ...moviesList.slice(mainMovies.length, mainMovies.length + addMoviesOnMediumWigth)]);
            } else {
                setMainMovies([...mainMovies, ...moviesList.slice(mainMovies.length, mainMovies.length + addMoviesOnSmallWigth)]);
            }
        }
         
    }

  const navigate = useNavigate();

  function tokenCheck(){
    if (localStorage.getItem('jwt') !== null) {
    const jwt = localStorage.getItem('jwt');
    auth
      .checkToken(jwt)
      .then(() => {
        localStorage.setItem('loggedIn', true);
        setLoggedIn(true);
      })
      .catch((err) => {
    
        console.log(`err: ` + err);
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
        setTextInfoTooltip(textRegisterOk);
        setImgInfoTooltip(imgOk);
        handleLogin({email, password})
      })
      .catch((err) => {
        setTextInfoTooltip(textRegisterError);
        setImgInfoTooltip(imgError);
       
      });
  }
  function closeInfoTooltip() {
    if (textInfoTooltip === textRegisterOk) {
      navigate("/signin", { replace: true });
    }
    if (textInfoTooltip === textLoginOk) {
      navigate("/", { replace: true });
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
          setTextInfoTooltip(textLoginOk);
          setImgInfoTooltip(imgOk);
          localStorage.setItem("jwt", data.token);
          setUserEmail(data.email);
          setUserName(data.name);
          setLoggedIn(true);
          localStorage.setItem('loggedIn', true);
        }
       
      })
      .catch((err) => {
        setTextInfoTooltip(textRegisterError);
        setImgInfoTooltip(imgError);
        console.log(err);
      });
  }
  const handleExit = () => {
    if (localStorage.getItem('movies') !== null){
      localStorage.clear();
       
    }
    setLoggedIn(false);
    setUserName('');
    setUserEmail('');
    setSavedMovies([]);
    setIsLoading(false);
    setMainMovies([]);
    setSearch('');
    setSearchSavedMovies('');
    setIsOpenInfoTooltip(false);
    setTextInfoTooltip('');
    setImgInfoTooltip('');
    setButtonMore(false);
    setCheckedSwitch(false);
    setErrorTextMovie('');
    setIsErrorTextMovie(false);
    setErrorTextSavedMovie('');
    setIsErrorTextSavedMovie(false);
    setShortMovies([]);

    localStorage.removeItem("jwt");
    navigate("/", { replace: true });
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
      setIsOpenInfoTooltip(true);
      setTextInfoTooltip(textUpdateOk);
      setImgInfoTooltip(imgOk);
    })
      .catch((err) => {
              setIsOpenInfoTooltip(true);
              setTextInfoTooltip(err);
              setImgInfoTooltip(imgError);
            });
  }
  function onClickSwitch(){
    
  }
  function onClickSavedSwitch(){

  }
  function clickGoBack(){
    navigate(-1);
  }
  return (
    <div className="main">
        <Routes>
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
                    onClickSwitch={onClickSwitch}
                    cancelCheckSwitch={cancelCheckSwitch}
                    onCheckSwitch={onCheckSwitch}
                    errorTextMovie={errorTextMovie}
                    isErrorTextMovie={isErrorTextMovie}
                  />
                }
            />
            <Route
                path="/saved-movies"
                element={
                  <ProtectedRouteElement
                    element={SavedMovies}
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
                    onClickSwitch={onClickSavedSwitch}
                    cancelCheckSwitch={cancelCheckSwitch}
                    onCheckSwitch={onCheckSwitch}
                    errorTextSavedMovie={errorTextSavedMovie}
                    isErrorTextSavedMovie={isErrorTextSavedMovie}
                    />
                }
            />
       
            <Route
            path="/signup"
            element={
             loggedIn ?
                <Navigate to="/" replace={true} />  
                :
                <Auth loginPage={false} onSubmit={handleRegister}/>
            }
            />
            <Route
            path="/signin"
            element={
              loggedIn ? 
                <Navigate to="/" replace={true} />
                  :
                <Auth loginPage={true} onSubmit={handleLogin} />}
            />
          <Route
            path="*"
            element={
              (localStorage.getItem('jwt') !== null) ? (
                <ErrorPage clickGoBack={clickGoBack} /> 
              ) : (
                <Navigate to="/" replace={true} />
              )
            }
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
