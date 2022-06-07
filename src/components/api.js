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
      method: 'GET',
      headers: this._config.headers
    })
      .then(this._checkResponse)
  }

  getProfileInfo() {
    return fetch(`${this._config.baseUrl}/users/me`, {
      method: 'GET',
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
}
