import React from "react";
import { Route, Routes } from "react-router-dom";
import "../../index.css";

import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import Login from "../Login/Login";
import ErrorPage from "../ErrorPage/ErrorPage";
import mainMovies from "../../utils/movies";
import saveMovies from "../../utils/save-movies";

function App() {
  return (
    <div className="body">
      <div className="page">
        <Routes>
            <Route
            path="/"
            element={<Main isLoggin="false"/>}
            />
            <Route
            path="/movies"
            element={<Movies isLoggin="true" buttonMore="true" savePage={false} movies={mainMovies}/>}
            />
            <Route
            path="/saved-movies"
            element={<Movies isLoggin="true" buttonMore="false" savePage={true} movies={saveMovies}/>}
            />
            <Route
            path="/profile"
            element={<Profile userName="Kristina" userEmail="kristina@mail.ru"/>}
            />
            <Route
            path="/signup"
            element={<Register />}
            />
            <Route
            path="/signin"
            element={<Login />}
            />
            <Route
            path="*"
            element={<ErrorPage />}
            />
        </Routes>
       
      </div>
    </div>
  );
};

export default App;
