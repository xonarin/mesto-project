/* Класс создания карточки, остаётся в card.js */
export default class Card {
  constructor(
    handleOpenCardClick,
    handleDeleteCardClick,
    handleLikeCardClick,
    card,
    userId,
    selector
  ) {
    this.link = card.link;
    this._likes = card.likes;
    this._userId = userId;
    this._selector = selector;
    this.name = card.name;
    this._ownerId = card.owner._id;
    this._id = card._id;
    this._handleOpenCardClick = handleOpenCardClick;
    this._handleDeleteClick = handleDeleteCardClick;
    this._handleLikeClick = handleLikeCardClick;
  }

  getCard() {
    // Поиск элементов карточки
    this._element = this._getCloneElement();
    // deleteBtn
    this._deleteButton = this._element.querySelector(".element__btn-trash");
    // _likeCounter
    this._likeCount = this._element.querySelector(".element__like-count");
    // likeButton
    this._likeButton = this._element.querySelector(".element__like-button");
    // cardImage
    this._elementImage = this._element.querySelector(".element__image");

    // Отрисовка названия и фото карточки
    this._element.querySelector(".element__title").textContent = this.name;
    this._elementImage.src = this.link;
    this._elementImage.alt = this.name;

    // Проверка-добавление мусорки у "своей" карточки
    if (this._ownerId !== this._userId) {
      this._deleteButton.remove();
    }

    // Добавление лайков и слушателей
    this._setEventListeners();
    this._likesOfCards();

    return this._element;
  }
  _getCloneElement() {
    const cardElement = document
      .querySelector(this._selector)
      .content
      .querySelector(".element")
      .cloneNode(true);
    return cardElement;
  }

  isLiked() {
    // Нужно переписать этот код в идеале
    return Boolean(this._likes.find(user => user._id === this._userId));
  }

  // Добавление слушателей на кнопки, которые мы отрисовали ранее
  _setEventListeners() {
    this._elementImage.addEventListener("click", () => {
      this._handleOpenCardClick(this); // Добавил сам элемент в this._свойство, вместо просто this
    });

    this._likeButton.addEventListener("click", () => {
      this._handleLikeClick(this, this._id); // Добавил сам элемент в this._свойство, вместо просто this
    });

    if (this._deleteButton) {
      this._deleteButton.addEventListener("click", () => {
        this._handleDeleteClick(this, this._id); // Добавил сам элемент в this._свойство, вместо просто this
      });
    }
  }
  // Удаление карточки
  removeCard() {
    this._element.remove();
  }
  // updateLikes
  newCountLikes(cardCountLikes) {
    this._likes = cardCountLikes.likes;
    this._likesOfCards();
  }
  // Отображение количества лайков
  _likesOfCards() {
    this._likeCount.textContent = this._likes.length;
    // Отрисовка UI лайка
    if (this.isLiked()) {
      this._likeButton.classList.add("element__like-button_active");
    } else {
      this._likeButton.classList.remove("element__like-button_active");
    }
  }
}
