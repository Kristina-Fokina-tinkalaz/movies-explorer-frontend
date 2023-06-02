import React from "react";
import { Route, Routes } from "react-router-dom";
import "../../index.css";

import Main from '../Main/Main.js';
import Movies from '../Movies/Movies.js';
import SavedMovies from '../SavedMovies/SavedMovies.js';
import Profile from '../Profile/Profile.js';
import Register from '../Register/Register.js';
import Login from "../Login/Login";
import ErrorPage from "../ErrorPage/ErrorPage";

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
            element={<Movies isLoggin="true" buttonMore="true"/>}
            />
            <Route
            path="/saved-movies"
            element={<SavedMovies isLoggin="true"/>}
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
