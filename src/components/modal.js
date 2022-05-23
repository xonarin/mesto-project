const popupView = document.querySelector('.popup_view-image');
const popupViewImage = popupView.querySelector('.popup__image');
const popupViewDesc = popupView.querySelector('.popup__description');
const popupAddCard = document.querySelector('.popup_form_add-card');
const popupProfile = document.querySelector('.popup_form_edit-profile');
const popupAvatar = document.querySelector('.popup_avatar');
const popupConfirmDelete = document.querySelector('.popup_delete');
const popupConfirmDeleteBtn = document.querySelector('.form__submit_confirm');

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

/* Закрытие по оверлею и крестику */
Array.from(document.querySelectorAll(".popup")).forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }

    if (evt.target.classList.contains('form__close')) {
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
  popupConfirmDelete,
  popupConfirmDeleteBtn
}
