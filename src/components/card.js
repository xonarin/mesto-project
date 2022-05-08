import {
  openPopup,
  closePopup,
  popupView,
  popupViewImage,
  popupViewDesc,
  popupAddCard,
  popupAddCardName,
  popupAddCardLink
} from '../components/modal.js';

const elementList = document.querySelector('.elements__list');
const addCardForm = popupAddCard.querySelector('.form');
const buttonForm = addCardForm.querySelector('.form__submit');
const cardTemplate = document.querySelector('#card-template').content;

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

/* Функция создания карточки */

function createCard(cardImage, cardName) {
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.element__image');

  cardElementImage.src = cardImage;
  cardElementImage.alt = cardName;
  cardElement.querySelector('.element__title').textContent = cardName;


  /* Лайк карточки */
  cardElement.querySelector('.element__like-button').addEventListener('click', function (event) {
    event.target.classList.toggle('element__like-button_active');
  })

  /* Удаление карточки */
  cardElement.querySelector('.element__btn-trash').addEventListener('click', function (event) {
    event.target.closest('.element').remove();
  })

  /* Открытие карточки в popup окне*/
  cardElement.querySelector('.element__image').addEventListener('click', function () {
    popupViewImage.src = cardImage;
    popupViewImage.alt = cardName;
    popupViewDesc.textContent = cardName;

    openPopup(popupView);

  })


  return cardElement;
}

/* Функция перебора массива с  карточками */
function renderInitialCards(initialCards) {
  initialCards.forEach((item) => {
    elementList.append(createCard(item.link, item.name));
  })
}

/* Функция добавления новой карточки из формы */
function handleNewCardSubmit(event) {
  event.preventDefault();

  elementList.prepend(createCard(popupAddCardLink.value, popupAddCardName.value));

  closePopup(popupAddCard);
  addCardForm.reset();
  buttonForm.classList.add('form__submit_disabled');
  buttonForm.disabled = true;
}

addCardForm.addEventListener('submit', handleNewCardSubmit);

export { renderInitialCards, initialCards }
