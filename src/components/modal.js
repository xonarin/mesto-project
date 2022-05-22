const popupView = document.querySelector('.popup_view-image');
const popupViewImage = popupView.querySelector('.popup__image');
const popupViewDesc = popupView.querySelector('.popup__description');
const popupAddCard = document.querySelector('.popup_form_add-card');
const popupProfile = document.querySelector('.popup_form_edit-profile');
const popupAvatar = document.querySelector('.popup_avatar');
const popupConfirmDelete = document.querySelector('.popup_delete');

/* Открытие поп апа */
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closeByEscape);
}


/* Закрытие поп апа */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closeByEscape);
}


/* Закрытие попап по ESC */
function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}


/* Закрываем поп апы по клику на крестик */
Array.from(document.querySelectorAll(".form__close")).forEach((elem) => {
  elem.addEventListener("click", (evt) => {
    closePopup(evt.target.closest(".popup"));
  });
});


/* Закрытие по оверлею */
Array.from(document.querySelectorAll(".popup")).forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
  })
})


export {
  openPopup,
  closePopup,
  popupView,
  popupViewImage,
  popupViewDesc,
  popupAddCard,
  popupProfile,
  popupAvatar,
  popupConfirmDelete
}
