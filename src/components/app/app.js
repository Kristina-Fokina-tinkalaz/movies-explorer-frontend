
import { Route, Routes , useNavigate, Navigate} from "react-router-dom";
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
  const [errorTextMovie, setErrorTextMovie] = useState('');
  const [isErrorTextMovie, setIsErrorTextMovie] = useState(false);
  const [errorTextSavedMovie, setErrorTextSavedMovie] = useState('');
  const [isErrorTextSavedMovie, setIsErrorTextSavedMovie] = useState(false);
  const [shortMovies, setShortMovies] = useState([]);

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
        if (movie.duration < 40){
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
            setTextInfoTooltip('Нужно ввести ключевое слово');
            setImgInfoTooltip(imgError);
        }
        else {
              if (localStorage.getItem('saved-movies') !== null){
                   let result = [];
              JSON.parse(localStorage.getItem('saved-movies')).map((movie) => {
                if (movie.nameRU.toLowerCase().includes(searchSavedMovies) || movie.nameEN.toLowerCase().includes(searchSavedMovies)){
                  if (!checkedSwitch){
                    result.push(movie);
                  } else if (movie.duration < 40){ 
                    result.push(movie);
                  }
                } 
                setSavedMovies(result);
                setIsErrorTextSavedMovie(false);
                setErrorTextSavedMovie('');

                if (result.length === 0){
                  setSavedMovies(result);
                  setIsErrorTextSavedMovie(true);
                  setErrorTextSavedMovie('Ничего не найдено, попробуйте еще раз');
                }
              }
              )
              } else {
                setIsErrorTextSavedMovie(true);
                setErrorTextSavedMovie('Вы еще ничего не сохранили');
              }
           
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
                console.log(dataMovies);
                showMovies();
                if (result.length === 0){
                    setIsErrorTextMovie(true);
                    setErrorTextMovie('Ничего не найдено, попробуйте еще раз');
                }
                else {
                  setIsErrorTextMovie(false);
                  setErrorTextMovie('');
                }
            })
            .catch(() => {
              setIsOpenInfoTooltip(true);
              setTextInfoTooltip('Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз');
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
           if (window.innerWidth > 870){
                    setMainMovies(mainMoviesFromStorage.slice(0, 12));
                    if (mainMoviesFromStorage.length > 12) {
                        setButtonMore(true);
                    } else {
                        setButtonMore(false);
                    }
                } else if (window.innerWidth > 480 && window.innerWidth <= 870){
                    setMainMovies(mainMoviesFromStorage.slice(0, 8));
                    if (mainMoviesFromStorage.length > 8) {
                        setButtonMore(true);
                    } else {
                        setButtonMore(false);
                    }
                } else {
                    setMainMovies(mainMoviesFromStorage.slice(0, 5));
                    if (mainMoviesFromStorage.length > 5) {
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
              if (window.innerWidth > 870){
                setMainMovies([...mainMovies, ...moviesList.slice(mainMovies.length, mainMovies.length + 3)]);
            } else if (window.innerWidth > 480 && window.innerWidth <= 870){
                setMainMovies([...mainMovies, ...moviesList.slice(mainMovies.length, mainMovies.length + 2)]);
            } else {
                setMainMovies([...mainMovies, ...moviesList.slice(mainMovies.length, mainMovies.length + 5)]);
            }
        }
         
    }

  const navigate = useNavigate();
    const tokenCheck = () => {
      console.log(loggedIn);

     if (localStorage.getItem('jwt') !== null) {
      const jwt = localStorage.getItem("jwt");
      auth
        .checkToken(jwt)
        .then(() => {
          setLoggedIn(true);
          // navigate("/movies", { replace: true });
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
      setTextInfoTooltip('Данные профиля изменены');
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

  return (
    <div className="main">
        <Routes>
          <Route
            path="*"
            element={
              (localStorage.getItem('jwt') !== null) ? (
                <ErrorPage /> 
              ) : (
                <Navigate to="/" replace />
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
                <Navigate to="/" replace />  
                :
                <Auth loginPage={false} onSubmit={handleRegister}/>
            }
            />
            <Route
            path="/signin"
            element={
              loggedIn ? 
                <Navigate to="/" replace />
                  :
                <Auth loginPage={true} onSubmit={handleLogin} />}
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
