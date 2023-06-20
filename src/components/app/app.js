
import { Route, Routes , useNavigate, Navigate, useLocation} from "react-router-dom";
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
import { WINDOW_WIDTH_SMALL, WINDOW_WIDTH_BIG, DURATION_SHORT_MOVIE, textErrorSearch, textErrorSearchNotFound, textErrorSearchSavedMovie, textErrorServerSearch, SUM_MOVIES_ON_BIG_WIDTH, SUM_MOVIES_ON_MEDIUM_WIDTH, SUM_MOVIES_ON_SMALL_WIDTH, ADD_MOVIES_ON_BIG_WIDTH, ADD_MOVIES_ON_MEDIUM_WIDTH, ADD_MOVIES_ON_SMALL_WIDTH, textRegisterOk, textRegisterError, textLoginOk, textUpdateOk } from "../../utils/constants";

function App() {
 
  const [loggedIn, setLoggedIn] = useState(localStorage.getItem('loggedIn') || false);
  const [userName, setUserName] = useState(localStorage.getItem('name') || '');
  const [userEmail, setUserEmail] = useState(localStorage.getItem('email') || '');
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
  const [checkedSwitchSavedMovies, setCheckedSwitchSavedMovies] = useState(false);
  const [errorTextMovie, setErrorTextMovie] = useState('');
  const [isErrorTextMovie, setIsErrorTextMovie] = useState(false);
  const [errorTextSavedMovie, setErrorTextSavedMovie] = useState('');
  const [isErrorTextSavedMovie, setIsErrorTextSavedMovie] = useState(false);

  const location = useLocation();

    tokenCheck();

    useEffect(()=>{
        tokenCheck();
      if (loggedIn){

         mainApi
        .getUserData()
        .then((data) => {
          setUserName(data.name);
          setUserEmail(data.email);
          localStorage.setItem('name', data.name);
          localStorage.setItem('email', data.email);
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
       
       if (localStorage.getItem('saved-movies') !== null){
        setSavedMovies(JSON.parse(localStorage.getItem('saved-movies')));
       }
       setSearchSavedMovies('');
       setErrorTextSavedMovie('');
       setIsErrorTextSavedMovie(false);
       setCheckedSwitchSavedMovies(false);


       if (checkedSwitch && localStorage.getItem('short-movies') !== null && mainMovies.length === JSON.parse(localStorage.getItem('short-movies')).length){
        setButtonMore(false);
       }
      }
       
      
    }, [ setSavedMovies, setUserName, setUserEmail, loggedIn, mainMovies, location] );

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
      
      if (JSON.parse(localStorage.getItem('movies')) !== null ){
      let result =[];
      JSON.parse(localStorage.getItem('movies')).map((movie) => {
        if (movie.duration < DURATION_SHORT_MOVIE){
          result.push(movie);
        }
      })
      setMainMovies(result);
      localStorage.setItem('short-movies', JSON.stringify(result));

      if (result.length === 0 ){
            setIsErrorTextMovie(true);
            setErrorTextMovie(textErrorSearchNotFound);
      }
      else {
        setIsErrorTextMovie(false);
        setErrorTextMovie('');
      }
    }
    }

    function onCheckSwitchSavedMovies(){
      setCheckedSwitchSavedMovies(true);
      if (localStorage.getItem('saved-movies') !== null){
        let result =[];
        JSON.parse(localStorage.getItem('saved-movies')).map((movie) => {
          if (movie.duration < DURATION_SHORT_MOVIE){
            result.push(movie);
          }
        })
        setSavedMovies(result);
      }
    }

    function cancelCheckSwitch(){
      setCheckedSwitch(false);
      // setMainMovies(JSON.parse(localStorage.getItem('movies')));
      if (localStorage.getItem('movies') !== null){
         let result = [];
          JSON.parse(localStorage.getItem('movies')).map((movie) => {
        if (movie.nameRU.toLowerCase().includes(search) || movie.nameEN.toLowerCase().includes(search)){
          result.push(movie);
        }
      })
        setMainMovies(result);
        setIsErrorTextMovie(false);
        setErrorTextMovie('');
      }
    }

    function cancelCheckSwitchSavedMovies(){
      setCheckedSwitchSavedMovies(false);
      setSavedMovies(JSON.parse(localStorage.getItem('saved-movies')));
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
              if (searchSavedMovies !== null && localStorage.getItem('saved-movies') !== null ){
                   let result = [];
             JSON.parse(localStorage.getItem('saved-movies')).map((movie) => {
                if (movie.nameRU.toLowerCase().includes(searchSavedMovies) || movie.nameEN.toLowerCase().includes(searchSavedMovies)){
                  if (!checkedSwitch){
                    result.push(movie);
                  } else if (movie.duration < DURATION_SHORT_MOVIE){ 
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
                    result.push(movie);
                    }
                })
                localStorage.setItem('movies', JSON.stringify(result));

                let shortMovies = [];
                  result.map((movie) => {
                    if (checkedSwitch && movie.duration < DURATION_SHORT_MOVIE){
                      shortMovies.push(movie);
                    }
                  })
                localStorage.setItem('short-movies', JSON.stringify(shortMovies));

                localStorage.setItem('search', search);
                localStorage.setItem('checkedSwitch', checkedSwitch);
            
                showMovies();
                if (result.length === 0 || (checkedSwitch && shortMovies.length === 0)){
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
           if (window.innerWidth > WINDOW_WIDTH_BIG){
                    setMainMovies(mainMoviesFromStorage.slice(0, SUM_MOVIES_ON_BIG_WIDTH));
                    if (mainMoviesFromStorage.length > SUM_MOVIES_ON_BIG_WIDTH) {
                        setButtonMore(true);
                    } else {
                        setButtonMore(false);
                    }
                } else if (window.innerWidth > WINDOW_WIDTH_SMALL && window.innerWidth <= WINDOW_WIDTH_BIG){
                    setMainMovies(mainMoviesFromStorage.slice(0, SUM_MOVIES_ON_MEDIUM_WIDTH));
                    if (mainMoviesFromStorage.length > SUM_MOVIES_ON_MEDIUM_WIDTH ) {
                        setButtonMore(true);
                    } else {
                        setButtonMore(false);
                    }
                } else {
                    setMainMovies(mainMoviesFromStorage.slice(0, SUM_MOVIES_ON_SMALL_WIDTH));
                    if (mainMoviesFromStorage.length > SUM_MOVIES_ON_SMALL_WIDTH) {
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
              if (window.innerWidth > WINDOW_WIDTH_BIG){
                setMainMovies([...mainMovies, ...moviesList.slice(mainMovies.length, mainMovies.length + ADD_MOVIES_ON_BIG_WIDTH)]);
            } else if (window.innerWidth > WINDOW_WIDTH_SMALL && window.innerWidth <= WINDOW_WIDTH_BIG){
                setMainMovies([...mainMovies, ...moviesList.slice(mainMovies.length, mainMovies.length + ADD_MOVIES_ON_MEDIUM_WIDTH)]);
            } else {
                setMainMovies([...mainMovies, ...moviesList.slice(mainMovies.length, mainMovies.length + ADD_MOVIES_ON_SMALL_WIDTH)]);
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

    function tokenCheck(){
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
          setTextInfoTooltip(textLoginOk);
          setImgInfoTooltip(imgOk);
          localStorage.setItem("jwt", data.token);
          setUserEmail(data.email);
          setUserName(data.name);
          setLoggedIn(true);
          localStorage.setItem('loggedIn', true);
          navigate("/movies", { replace: true});
        }
       
      })
      .catch((err) => {
        setTextInfoTooltip(textRegisterError);
        setImgInfoTooltip(imgError);
        console.log(err);
      });
  }
  const handleExit = () => {
    localStorage.clear();
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

    // localStorage.removeItem("jwt");
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
      localStorage.setItem('name', userData.name);
      localStorage.setItem('email', userData.email);
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
                    checkedSwitch={checkedSwitchSavedMovies}
                    onClickSwitch={onClickSavedSwitch}
                    cancelCheckSwitch={cancelCheckSwitchSavedMovies}
                    onCheckSwitch={onCheckSwitchSavedMovies}
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
