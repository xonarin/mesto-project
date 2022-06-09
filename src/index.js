import './pages/index.css'; // добавьте импорт главного файла стилей
import UserInfo from './components/UserInfo.js';
import Section from './components/Section.js';
import Card from './components/Card.js';
import PopupWithForm from './components/PopupWithForm.js';
import PopupWithImage from './components/PopupWithImage.js';
import FormValidator from './components/FormValidator.js';

import {
  profileEditBtn,
  profileAvatarEdit,
  btnAddNewCard,
  formEditProfile,
  formAddCard,
  api,
  validationSettings
} from './components/utils.js';

export let profileId = "";

let cardElementDelete;
let cardElementId;


/* Создание экземпляра класса UserInfo */
const profileUser = new UserInfo(".profile__user-name", ".profile__user-description", ".profile__avatar");

/* Создание экземпляра класс Section и Card */
const cardsContainer = new Section({
  renderer: (item) => {
    const card = new Card(
      handleOpenCardClick,
      handleDeleteCardClick,
      handleLikeCardClick,
      item,
      profileUser.getProfileInfo(),
      "#card-template");
    cardsContainer.addItem(card.getCard());
  }
}, ".elements__list");

//Создание экземпляра открытие поп апа изображения
const popupImage = new PopupWithImage(".popup_view-image"); //
popupImage.setEventListeners();

// Создание экземпляра добавление карточки в поп ап окне
const addCardPopup = new PopupWithForm(".popup_form_add-card", handleNewCardSubmit);
addCardPopup.setEventListeners();

// Создание экземпляра удалить карточку в поп ап окне.
const deleteCardPopup = new PopupWithForm(".popup_delete", handleDeleteFormSubmit);
deleteCardPopup.setEventListeners();

// Создание экземпляра редактирование профиля в поп ап окне
const editProfilePopup = new PopupWithForm('.popup_form_edit-profile', handleEditProfile);
editProfilePopup.setEventListeners();

// Создание экземпляра редактирование аватара в поп ап окне
const editAvatarPopup = new PopupWithForm(".popup_avatar", handleEditAvatar);
editAvatarPopup.setEventListeners();

//Создаём экземпляр валидации

const formValidate = {}; //

const validationCheck = (options) => {
  const formList = Array.from(document.querySelectorAll(options.formSelector))
  formList.forEach((formElement) => {

    // Поиск формы по атрибуту name
    const nameForm = formElement.getAttribute('name')
    // Создание класса для каждой формы "отдельно"
    const validate = new FormValidator(options, formElement)

    // Использование класса FormValidator для нашей формы найденной в массиве formValidate
    formValidate[nameForm] = validate;
    validate.enableValidation();
  });
};


validationCheck(validationSettings);

// Функцию эту передаём в экземпляр Card
function handleDeleteCardClick(card, id) {
  deleteCardPopup.openPopup();
  cardElementDelete = card;
  cardElementId = id;
}
// Функцию эту передаём в экземпляр Card
function handleOpenCardClick(card) {
  popupImage.openPopup(card.name, card.link);
}

//Добавление карточки
function handleNewCardSubmit() {
  const { name, image } = addCardPopup.getInputValues();
  addCardPopup.renderLoading(true);
  api.addCard(name, image)
    .then((item) => {
      cardsContainer.renderItem(item);
      addCardPopup.closePopup();
    })
    .catch((err) => console.log(err))
    .finally(() => addCardPopup.renderLoading(false, "Создать"))
}

//Удаление карточки
function handleDeleteFormSubmit() {
  deleteCardPopup.renderLoading(true, "Да", "Удаление...");
  api.removeCard(cardElementId)
    .then(() => {
      cardElementDelete.removeCard();
      deleteCardPopup.closePopup();
    })
    .catch((err) => console.log(err))
    .finally(() => deleteCardPopup.renderLoading(false, "Да"))
}

// Редактирование профиля
function handleEditProfile() {
  const { name, about } = editProfilePopup.getInputValues();
  editProfilePopup.renderLoading(true);
  api.editProfile(name, about)
    .then((res) => {
      profileUser.setUserInfo(res);
      editProfilePopup.closePopup();
    })
    .catch((err) => console.log(err))
    .finally(() => {
      editProfilePopup.renderLoading(false);
    })
}

// Редактирование аватара
function handleEditAvatar() {
  const { link } = editAvatarPopup.getInputValues();
  editAvatarPopup.renderLoading(true);
  api.updateAvatar(link)
    .then((res) => {
      console.log(editAvatarPopup.getInputValues());
      profileUser.setUserInfo(res);
      editAvatarPopup.closePopup();
    })
    .catch(err => console.log(err))
    .finally(() => {
      editAvatarPopup.renderLoading(false);
    })
}


// Функцию эту передаём в экземпляр Card
function handleLikeCardClick(card, id) {
  if (card.isLiked()) {
    api.removeLikeCard(id)
      .then((res) => card.newCountLikes(res))
      .catch((err) => console.log(err))
  } else {
    api.addLikeCard(id)
      .then((res) => card.newCountLikes(res))
      .catch((err) => console.log(err))
  }
}

/* Получаем профиля и массива карточек по API и передаём результат в экземпляр класса Секции cardsContainer в метод  renderItems*/
Promise.all([api.getProfileInfo(), api.getCards()])
  .then(([profile, cards]) => {
    profileUser.setUserInfo(profile);
    cardsContainer.renderItems(cards);
  })
  .catch((err) => console.log(err))

/* Открытие поп ап добавления карточки */
btnAddNewCard.addEventListener('click', () => {
  addCardPopup.openPopup();
  console.log(formValidate['add']);
  formValidate['add'].resetFormValidation();
});

/* Открытие поп ап редактирования профиля */
profileEditBtn.addEventListener('click', () => {
  formValidate['edit'].resetFormValidation();
  const info = profileUser.getUserInfo();
  formEditProfile.elements.name.value = info.name;
  formEditProfile.elements.about.value = info.about;
  editProfilePopup.openPopup();
});

// /* Открытие поп ап редактирования аватарки */
profileAvatarEdit.addEventListener('click', () => {
  formValidate['avatar'].resetFormValidation();
  editAvatarPopup.openPopup()
});
