import { enableValidation } from '../components/validate.js';
import { popupProfile } from '../components/modal.js';

const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAvatarEdit = document.querySelector('.profile__avatar-container');
const profileAvatarImage = document.querySelector('.profile__avatar');
const profileUserName = document.querySelector('.profile__user-name');
const profileUserDescription = document.querySelector('.profile__user-description');
const profileForm = popupProfile.querySelector('.form');
const btnAddNewCard = document.querySelector('.profile__add-button');
const formEditProfile = document.forms.edit;
const formAvatar = document.forms.avatar;
const formAddCard = document.forms.add;

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
});

const apiConfig = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/plus-cohort-9',
  headers: {
    authorization: 'a39c8558-f48b-417f-a95f-ba9abdcaf643',
    "Content-Type": "application/json"
  }
}


export {
  profileEditBtn,
  profileAvatarEdit,
  profileAvatarImage,
  profileUserName,
  profileUserDescription,
  profileForm,
  btnAddNewCard,
  formEditProfile,
  formAvatar,
  formAddCard,
  apiConfig
}
