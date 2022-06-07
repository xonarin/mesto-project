// import { apiConfig } from "../components/utils.js";
export default class Api {
  constructor(options) {
    this._config = options;

  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json()
    } else {
      return Promise.reject(`Ошибка: ${res.status}`)
    }
  }

  getCards() {
    return fetch(`${this._config.baseUrl}/cards`, {
      method: 'GET', /* Не обязательно */
      headers: this._config.headers
    })
      .then(this._checkResponse)
  }

  getProfileInfo() {
    return fetch(`${this._config.baseUrl}/users/me`, {
      method: 'GET', /* Не обязательно */
      headers: this._config.headers
    })
      .then(this._checkResponse)
  }

  addCard(nameCard, linkCard) {
    return fetch(`${this._config.baseUrl}/cards`, {
      method: 'POST',
      headers: this._config.headers,
      body: JSON.stringify({
        name: nameCard,
        link: linkCard
      })
    })
      .then(this._checkResponse)
  }

  editProfile(name, about) {
    return fetch(`${this._config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._config.headers,
      body: JSON.stringify({
        name: name,
        about: about
      })
    })
      .then(this._checkResponse)
  }

  updateAvatar(link) {
    return fetch(`${this._config.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._config.headers,
      body: JSON.stringify({
        avatar: link
      })
    })
      .then(this._checkResponse)
  }

  removeCard(cardId) {
    return fetch(`${this._config.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._config.headers
    })
      .then(this._checkResponse)
  }

  addLikeCard(cardId) {
    return fetch(`${this._config.baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._config.headers
    })
      .then(this._checkResponse)
  }

  removeLikeCard(cardId) {
    return fetch(`${this._config.baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._config.headers
    })
      .then(this._checkResponse)
  }
  // другие методы работы с API
}

// const api = new Api({
//   baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-9',
//   headers: {
//     authorization: 'a39c8558-f48b-417f-a95f-ba9abdcaf643',
//     "Content-Type": "application/json"
//   }
// });


// function checkResponse(res) {
//   if (res.ok) {
//     return res.json()
//   } else {
//     return Promise.reject(`Ошибка: ${res.status}`)
//   }
// }

// export const getProfileInfo = () => {
//   return fetch(`${apiConfig.baseUrl}/users/me`, {
//     method: "GET",
//     headers: apiConfig.headers
//   })
//     .then(checkResponse)
// }

// export const getCards = () => {
//   return fetch(`${apiConfig.baseUrl}/cards`, {
//     method: 'GET',
//     headers: apiConfig.headers
//   })
//     .then(checkResponse)
// }

// export const addCard = (nameCard, linkCard) => {
//   return fetch(`${apiConfig.baseUrl}/cards`, {
//     method: 'POST',
//     headers: apiConfig.headers,
//     body: JSON.stringify({
//       name: nameCard,
//       link: linkCard
//     })
//   })
//     .then(checkResponse)
// }


// export const editProfile = (name, about) => {
//   return fetch(`${apiConfig.baseUrl}/users/me`, {
//     method: 'PATCH',
//     headers: apiConfig.headers,
//     body: JSON.stringify({
//       name: name,
//       about: about
//     })
//   })
//     .then(checkResponse)
// }


// export const updateAvatar = (link) => {
//   return fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
//     method: 'PATCH',
//     headers: apiConfig.headers,
//     body: JSON.stringify({
//       avatar: link
//     })
//   })
//     .then(checkResponse)
// }

// export const removeCard = (cardId) => {
//   return fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
//     method: 'DELETE',
//     headers: apiConfig.headers
//   })
//     .then(checkResponse)
// }

// export const addLikeCard = (cardId) => {
//   return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
//     method: 'PUT',
//     headers: apiConfig.headers
//   })
//     .then(checkResponse)
// }

// export const removeLikeCard = (cardId) => {
//   return fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
//     method: 'DELETE',
//     headers: apiConfig.headers
//   })
//     .then(checkResponse)
// }
