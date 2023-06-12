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

//   getUserData() {
//     return fetch(`${this._baseUrl}` + `/users/me`, {
//       headers: this._headers,
//     }).then(this._getResult);
//   }

//   saveEditData(dataName, dataAbout) {
//     return fetch(`${this._baseUrl}` + `/users/me`, {
//       method: "PATCH",
//       headers: this._headers,
//       body: JSON.stringify({
//         name: dataName,
//         about: dataAbout,
//       }),
//     }).then(this._getResult);
//   }
//   addNewCard(cardName, cardLink) {
//     return fetch(`${this._baseUrl}` + `/cards`, {
//       method: "POST",
//       headers: this._headers,
//       body: JSON.stringify({
//         name: cardName,
//         link: cardLink,
//       }),
//     }).then(this._getResult);
//   }

//   removeCard(cardId) {
//     return fetch(`${this._baseUrl}` + `/cards/` + `${cardId}`, {
//       method: "DELETE",
//       headers: this._headers,
//       body: JSON.stringify({
//         _id: cardId,
//       }),
//     }).then(this._getResult);
//   }

//   changeLikeCardStatus(cardId, isLiked) {
//     return fetch(`${this._baseUrl}` + `/cards/` + `${cardId}` + `/likes`, {
//       method: isLiked ? `PUT` : `DELETE`,
//       headers: this._headers,
//     }).then(this._getResult);
//   }

//   changeAvatar(avatar) {
//     return fetch(`${this._baseUrl}` + `/users/me/avatar`, {
//       headers: this._headers,
//       method: "PATCH",
//       body: JSON.stringify({
//         avatar: avatar,
//       }),
//     }).then(this._getResult);
//   }
}

const api = new moviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    "Content-Type": "application/json"
  },
});
export default api;
