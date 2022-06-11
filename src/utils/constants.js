import { enableValidation } from '../components/FormValidator.js';

const profileEditBtn = document.querySelector('.profile__edit-button');
const profileAvatarEdit = document.querySelector('.profile__avatar-container');
const btnAddNewCard = document.querySelector('.profile__add-button');
const formEditProfile = document.forms.edit;

const validationSettings = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
};

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
  btnAddNewCard,
  formEditProfile,
  apiConfig,
  validationSettings
}
