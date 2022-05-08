const popupView = document.querySelector('.popup_view-image');
const popupViewImage = popupView.querySelector('.popup__image');
const popupViewDesc = popupView.querySelector('.popup__description');
const popupViewClose = popupView.querySelector('.form__close');
const popupAddCard = document.querySelector('.popup_form_add-card');
const popupAddCardClose = popupAddCard.querySelector('.form__close');
const popupAddCardName = popupAddCard.querySelector('.form__input_type_title');
const popupAddCardLink = popupAddCard.querySelector('.form__input_type_link');
const popupProfile = document.querySelector('.popup_form_edit-profile');
const popupProfileNameInput = popupProfile.querySelector('.form__input_type_name');
const popupProfileAboutInput = popupProfile.querySelector('.form__input_type_about');
const popupProfileCloseBtn = popupProfile.querySelector('.form__close');


/* Открытие поп апа */
function popupOpened(popup) {
  popup.classList.add('popup_opened');
}


/* Закрытие поп апа */
function popupClose(popup) {
  popup.classList.remove('popup_opened');
}


/* Закрываем поп апы по клику на крестик начало */
popupProfileCloseBtn.addEventListener('click', () => popupClose(popupProfile));
popupAddCardClose.addEventListener('click', () => popupClose(popupAddCard));
popupViewClose.addEventListener('click', () => popupClose(popupView));

export {
  popupOpened,
  popupClose,
  popupView,
  popupViewImage,
  popupViewDesc,
  popupAddCard,
  popupAddCardName,
  popupAddCardLink,
  popupProfile,
  popupProfileNameInput,
  popupProfileAboutInput
}