import './pages/index.css'; // добавьте импорт главного файла стилей
import { renderInitialCards, initialCards } from './components/card.js';
import { enableValidation } from './components/validate.js';
import {
  openPopup,
  closePopup,
  popupAddCard,
  popupProfile,
  popupProfileNameInput,
  popupProfileAboutInput,
  popups
} from './components/modal.js';


const profileEditBtn = document.querySelector('.profile__edit-button');
const profileUserName = document.querySelector('.profile__user-name');
const profileUserDescription = document.querySelector('.profile__user-description');
const profileForm = popupProfile.querySelector('.form');
const btnAddNewCard = document.querySelector('.profile__add-button');

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__submit',
  inactiveButtonClass: 'form__submit_disabled',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
});

/* Вызов функции добавления карточек из массива */
renderInitialCards(initialCards);

/* Открываем поп апы по клику на редактировать профиль и добавить карточку */
profileEditBtn.addEventListener('click', function () {

  popupProfileNameInput.value = profileUserName.textContent;
  popupProfileAboutInput.value = profileUserDescription.textContent;

  openPopup(popupProfile);
})

btnAddNewCard.addEventListener('click', () => openPopup(popupAddCard));

/* Закрытие по оверлею */
popups.forEach((popup) => {
  popup.addEventListener('mousedown', (evt) => {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(popup)
    }
  })
})


/* Функция формы для изменения профиля*/
function handleProfileEditSubmit(event) {
  event.preventDefault();

  profileUserName.textContent = popupProfileNameInput.value;
  profileUserDescription.textContent = popupProfileAboutInput.value;

  closePopup(popupProfile);

  profileForm.reset();
}

profileForm.addEventListener('submit', handleProfileEditSubmit);
