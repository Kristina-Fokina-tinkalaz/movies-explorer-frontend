export const BASE_URL = "https://movie-tinkalaz.nomoredomains.monster";
// export const BASE_URL = "http://localhost:3000";

function getResult(data) {
  if (data.ok) {
    return data.json();
  }
  return Promise.reject(`Что-то пошло не так: ${data.status}`);
}

export const register = ({name, email, password}) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      password: password,
    }),
  }).then(getResult);
};
export const authorize = ({email, password}) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(getResult);
};
export const checkToken = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  }).then(getResult);
};
