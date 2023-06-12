import React from "react";

class MainApi extends React.Component {
  constructor(props) {
    super(props);
    this._baseUrl = props.baseUrl;
    this._headers = props.headers;
  }
  _getResult(data) {
    if (data.ok) {
      return data.json();
    }
    return Promise.reject(`Что-то пошло не так : ${data.status}`);
  }

  getInitialMovies() {
    return fetch(`${this._baseUrl}` + `/movies`, {
      headers: this._headers,
    }).then(this._getResult);
  }

  saveNewCard(
    {country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN}
    ) {
    return fetch(`${this._baseUrl}` + `/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
            country,
            director,
            duration,
            year,
            description,
            image,
            trailerLink,
            thumbnail,
            movieId,
            nameRU,
            nameEN
      }),
    }).then(this._getResult);
  }
  deleteCard(_id){
    return( fetch(`${this._baseUrl}` + `/movies/` + `${_id}`, {
      method: "DELETE",
      headers:this._headers,
      body: JSON.stringify({
        _id: _id,
      }),
    })).then(this._getResult);
  }

   getUserData() {
    return fetch(`${this._baseUrl}` + `/users/me`, {
      headers: this._headers,
    }).then(this._getResult);
  }

  updateProfile(name, email) {
    return fetch(`${this._baseUrl}` + `/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email
      })
    }).then(this._getResult);
  }
}
  


const mainApi = new MainApi({
  baseUrl: "https://movie-tinkalaz.nomoredomains.monster",
  // baseUrl: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${localStorage.getItem("jwt")}`
  },
});
export default mainApi;
