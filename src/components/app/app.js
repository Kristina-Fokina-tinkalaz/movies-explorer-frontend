import React from "react";
import { Route, Routes } from "react-router-dom";
import "../../index.css";

import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import Profile from '../Profile/Profile.js';
import Auth from "../Auth/Auth";
import ErrorPage from "../ErrorPage/ErrorPage";
import mainMovies from "../../utils/movies";
import saveMovies from "../../utils/save-movies";

function App() {
  return (
    <div className="main">
        <Routes>
            <Route
            path="/"
            element={<Main isLoggin="false"/>}
            />
            <Route
            path="/movies"
            element={<Movies isLoggin="true" buttonMore={true} savePage={false} movies={mainMovies}/>}
            />
            <Route
            path="/saved-movies"
            element={<Movies isLoggin="true" buttonMore={false} savePage={true} movies={saveMovies}/>}
            />
            <Route
            path="/profile"
            element={<Profile userName="Kristina" userEmail="kristina@mail.ru"/>}
            />
            <Route
            path="/signup"
            element={<Auth loginPage={false} />}
            />
            <Route
            path="/signin"
            element={<Auth loginPage={true}/>}
            />
            <Route
            path="*"
            element={<ErrorPage />}
            />
        </Routes>
       
      </div>
  );
};

export default App;
