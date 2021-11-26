const profileEditBtn  = document.querySelector('.profile__edit-button');
const profileUserName = document.querySelector('.profile__user-name');
const profileUserDescription = document.querySelector('.profile__user-description');
const popupProfile = document.querySelector('.popup_form_edit-profile');
const popupProfileNameInput = popupProfile.querySelector('.form__input_type_name');
const popupProfileAboutInput = popupProfile.querySelector('.form__input_type_about');
const popupProfileCloseBtn = popupProfile.querySelector('.form__close');
const profileForm = popupProfile.querySelector('.form');

const btnAddNewCard = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_form_add-card');
const popupAddCardName = popupAddCard.querySelector('.form__input_type_name');
const popupAddCardLink = popupAddCard.querySelector('.form__input_type_link');
const popupAddCardClose = popupAddCard.querySelector('.form__close');
const addCardForm = popupAddCard.querySelector('.form');

const popupView = document.querySelector('.popup_view-image');
const popupViewClose = popupView.querySelector('.form__close');
const popupViewImage = popupView.querySelector('.popup__image');
const popupViewDesc = popupView.querySelector('.popup__description');

const elementList = document.querySelector('.elements__list');

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
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);
  const cardElementImage = cardElement.querySelector('.element__image');

  cardElementImage.src = cardImage;
  cardElementImage.alt = cardName;
  cardElement.querySelector('.element__title').textContent = cardName;


  /* Лайк карточки */
  cardElement.querySelector('.element__like-button').addEventListener('click', function(event) {
    event.target.classList.toggle('element__like-button_active');
  })

  /* Удаление карточки */
  cardElement.querySelector('.element__btn-trash').addEventListener('click', function(event) {
    event.target.closest('.element').remove();
  })

  /* Открытие карточки в popup окне*/
  cardElement.querySelector('.element__image').addEventListener('click', function() {
    popupViewImage.src = cardImage;
    popupViewImage.alt = cardName;
    popupViewDesc.textContent = cardName;

    popupOpened(popupView);

  })


  return cardElement;
}

/* Функция перебора массива с  карточками */

function renderInitialCards(initialCards) {
  initialCards.forEach((item) => {
    elementList.append(createCard(item.link, item.name));
  })
}

/* Открытие поп апа */

function popupOpened(popup) {
  popup.classList.add('popup_opened');
}

/* Закрытие поп апа */

function popupClose(popup) {
  popup.classList.remove('popup_opened');
}

/* Открываем поп апы по клику на редактировать профиль и добавить карточку */

profileEditBtn.addEventListener('click', function() {

  popupProfileNameInput.value = profileUserName.textContent;
  popupProfileAboutInput.value = profileUserDescription.textContent;

  popupOpened(popupProfile);
})

btnAddNewCard.addEventListener('click', () => popupOpened(popupAddCard));

/* Закрываем поп апы по клику на крестик начало */

popupProfileCloseBtn.addEventListener('click', () => popupClose(popupProfile));

popupAddCardClose.addEventListener('click', () => popupClose(popupAddCard));

popupViewClose.addEventListener('click', () => popupClose(popupView));


/* Функция формы для изменения профиля*/

function handleProfileEditSubmit(event) {
  event.preventDefault();

  profileUserName.textContent = popupProfileNameInput.value;
  profileUserDescription.textContent = popupProfileAboutInput.value;

  popupClose(popupProfile);

  profileForm.reset();
}

profileForm.addEventListener('submit', handleProfileEditSubmit);

/* Функция добавления новой карточки из формы */
function handleNewCardSubmit(event) {
  event.preventDefault();

  elementList.prepend(createCard(popupAddCardLink.value, popupAddCardName.value));

  popupClose(popupAddCard);
  addCardForm.reset();
}

addCardForm.addEventListener('submit', handleNewCardSubmit);

/* Вызов функции добавления карточек из массива */
renderInitialCards(initialCards);
