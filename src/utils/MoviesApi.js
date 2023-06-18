import React from "react";

class moviesApi extends React.Component {
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
    return fetch(`${this._baseUrl}`, {
      headers: this._headers,
    }).then(this._getResult);
  }
}

const api = new moviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json"
  },
});
export default api;
