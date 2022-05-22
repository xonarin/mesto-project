import { formAddCard } from '../components/utils.js';

import {
  openPopup,
  closePopup,
  popupView,
  popupViewImage,
  popupViewDesc,
  popupAddCard,
  popupConfirmDelete
} from '../components/modal.js';

import { getCards, addCard, removeCard, addLikeCard, removeLikeCard } from '../components/api.js';
import { profileId } from '../index.js';

const elementList = document.querySelector('.elements__list');
const cardTemplate = document.querySelector('#card-template').content;

/* Получаем массив карточек по API и передаём результат в функцию renderInitialCards */
getCards()
  .then((card) => {
    console.log(card)
    renderInitialCards(card);
  })
  .catch((err) => {
    console.log(err);
  })
/* Функция создания карточки */


function createCard(cardImage, cardName, cardId, cardOwner, cardLikes) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.element__image');
  const cardLike = cardElement.querySelector('.element__like-button');
  const cardLikeCount = cardElement.querySelector('.element__like-count');
  cardElementImage.src = cardImage;
  cardElementImage.alt = cardName;
  cardElement.querySelector('.element__title').textContent = cardName;


  cardLikeCount.textContent = cardLikes.length;

  if (cardLikes) {
    /* Лайк карточки */
    likeCard(cardElement, cardLikeCount, cardId);
    cardLikes.forEach((card) => {
      if (card._id === profileId) {
        cardLike.classList.add('element__like-button_active');
      }
    })
  } else {
    cardLikeCount.textContent = 0;
  }


  /* Удаление карточки */
  if (cardOwner === profileId) {
    btnDeleteCard(cardElement);

    cardElement.querySelector('.element__btn-trash').addEventListener('click', function (event) {
      openPopup(popupConfirmDelete);
      confirmRemove(event);
    })
  }

  /* Подтверждение удаление карточки */
  function confirmRemove(card) {
    popupConfirmDelete.querySelector('.form__submit_confirm').addEventListener('click', function (event) {
      removeCard(cardId)
        .then(() => {
          console.log(cardId)
          card.target.closest('.element').remove();
          closePopup(popupConfirmDelete);
        })
        .catch((err) => {
          console.log(err);
        })
    })
  }

  /* Открытие карточки в popup окне*/
  cardElement.querySelector('.element__image').addEventListener('click', function () {
    popupViewImage.src = cardImage;
    popupViewImage.alt = cardName;
    popupViewDesc.textContent = cardName;
    openPopup(popupView);
  })

  return cardElement;
}

function likeCard(cardElement, cardLikeCount, cardId) {
  cardElement.querySelector('.element__like-button').addEventListener('click', function (event) {
    if (!event.target.classList.contains('element__like-button_active')) {
      addLikeCard(cardId)
        .then((card) => {
          event.target.classList.toggle('element__like-button_active');
          cardLikeCount.textContent = card.likes.length;
        })
        .catch((err) => {
          console.log(err);
        })

    } else {
      removeLikeCard(cardId)
        .then((card) => {
          event.target.classList.toggle('element__like-button_active');
          cardLikeCount.textContent = card.likes.length;
        })
        .catch((err) => {
          console.log(err);
        })
    }
  })
}


function btnDeleteCard(cardElement) {
  const btnDelete = document.createElement('button');
  btnDelete.classList.add('element__btn-trash');
  btnDelete.setAttribute("type", "button");
  cardElement.prepend(btnDelete);
  return btnDeleteCard;
}

/* Функция перебора массива с  карточками */
function renderInitialCards(initialCards) {
  initialCards.forEach((card) => {
    elementList.append(createCard(card.link, card.name, card._id, card.owner._id, card.likes));
  })
}

/* Функция добавления новой карточки из формы */
function handleNewCardSubmit(event) {
  event.preventDefault();
  formAddCard.elements.submit.textContent = 'Сохранение...';
  addCard(formAddCard.elements.name.value, formAddCard.elements.image.value)
    .then((card) => {
      console.log(card);
      elementList.prepend(createCard(formAddCard.elements.image.value, formAddCard.elements.name.value, card._id, card.owner._id, card.likes));
      closePopup(popupAddCard);
      formAddCard.reset();
      formAddCard.elements.submit.classList.add('form__submit_disabled');
      formAddCard.elements.submit.disabled = true;
    })
    .catch((err) => {
      console.log(err);
    })

}

export { handleNewCardSubmit }
