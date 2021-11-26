const profileEditBtn  = document.querySelector('.profile__edit-button');
const profileUserName = document.querySelector('.profile__user-name');
const profileUserDesc = document.querySelector('.profile__user-description');
const popupProfile = document.querySelector('.popup_form_edit-profile');
const popupProfileName = popupProfile.querySelector('.form__input_type_name');
const popupProfileAbout = popupProfile.querySelector('.form__input_type_about');
const popupProfileClose = popupProfile.querySelector('.form__close');
const profileForm = popupProfile.querySelector('.form');

const addCardBtn = document.querySelector('.profile__add-button');
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

function addCard(cardImage, cardName) {
  const cardTemplate = document.querySelector('#card-template').content;
  const cardElement = cardTemplate.querySelector('.element').cloneNode(true);

  cardElement.querySelector('.element__image').src = cardImage;
  cardElement.querySelector('.element__image').alt = cardName;
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

function ArrayInitialCards(initialCards) {
  initialCards.forEach((item) => {
    elementList.append(addCard(item.link, item.name));
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

  popupProfileName.value = profileUserName.textContent;
  popupProfileAbout.value = profileUserDesc.textContent;

  popupOpened(popupProfile);
})

addCardBtn.addEventListener('click', function() {
  popupOpened(popupAddCard);
})

/* Закрываем поп апы по клику на крестик начало */

popupProfileClose.addEventListener('click', () => popupClose(popupProfile));

popupAddCardClose.addEventListener('click', () => popupClose(popupAddCard));

popupViewClose.addEventListener('click', () => popupClose(popupView));


/* Функция формы для изменения профиля*/

function profileEditSubmit(event) {
  event.preventDefault();

  profileUserName.textContent = popupProfileName.value;
  profileUserDesc.textContent = popupProfileAbout.value;

  popupClose(popupProfile);

  profileForm.reset();
}

profileForm.addEventListener('submit', profileEditSubmit);

/* Функция добавления новой карточки из формы */
function addCardSubmit(event) {
  event.preventDefault();

  elementList.prepend(addCard(popupAddCardLink.value, popupAddCardName.value));

  popupClose(popupAddCard);
  addCardForm.reset();
}

addCardForm.addEventListener('submit', addCardSubmit);

/* Вызов функции добавления карточек из массива */
ArrayInitialCards(initialCards);
