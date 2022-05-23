import './pages/index.css'; // добавьте импорт главного файла стилей
import { handleNewCardSubmit, renderInitialCards, confirmRemove } from './components/card.js';
import { getProfileInfo, getCards, editProfile, updateAvatar } from './components/api.js';
import {
  openPopup,
  closePopup,
  popupAddCard,
  popupProfile,
  popupAvatar,
  popupConfirmDeleteBtn
} from './components/modal.js';

import {
  profileEditBtn,
  profileAvatarEdit,
  profileAvatarImage,
  profileUserName,
  profileUserDescription,
  profileForm,
  btnAddNewCard,
  formEditProfile,
  formAvatar,
  formAddCard
} from './components/utils.js';

export let profileId = "";

/* Получаем профиля и массива карточек по API и передаём результат в функцию renderInitialCards */
Promise.all([getProfileInfo(), getCards()])
  .then(([profile, card]) => {
    profileId = profile._id;
    profileUserName.textContent = profile.name;
    profileUserDescription.textContent = profile.about;
    profileAvatarImage.src = profile.avatar;
    renderInitialCards(card);
  })
  .catch((err) => {
    console.log(err);
  })

/* Функция формы для изменения профиля*/
function handleProfileEditSubmit(event) {
  event.preventDefault();
  formEditProfile.elements.submit.textContent = 'Сохранение...';
  editProfile(formEditProfile.elements.name.value, formEditProfile.elements.about.value)
    .then(() => {
      profileUserName.textContent = formEditProfile.elements.name.value;
      profileUserDescription.textContent = formEditProfile.elements.about.value;
      closePopup(popupProfile);
      profileForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formEditProfile.elements.submit.textContent = 'Сохранить';
    })
}


function handleAvatarEditSubmit(event) {
  event.preventDefault();
  formAvatar.elements.submit.textContent = 'Сохранение...';
  updateAvatar(formAvatar.elements.link.value)
    .then(() => {
      profileAvatarImage.src = formAvatar.elements.link.value;
      closePopup(popupAvatar);
      formAvatar.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      formAvatar.elements.submit.textContent = 'Сохранить';
    })
}


formAvatar.addEventListener('submit', handleAvatarEditSubmit);
profileForm.addEventListener('submit', handleProfileEditSubmit);
formAddCard.addEventListener('submit', handleNewCardSubmit);

/* Открываем поп апы по клику на редактировать профиль и добавить карточку */
profileEditBtn.addEventListener('click', function () {
  formEditProfile.elements.name.value = profileUserName.textContent;
  formEditProfile.elements.about.value = profileUserDescription.textContent;
  openPopup(popupProfile);
})

btnAddNewCard.addEventListener('click', () => openPopup(popupAddCard));

/* Открытие поп ап редактирования аватарки */
profileAvatarEdit.addEventListener('click', () => openPopup(popupAvatar));

/* Подтверждение удаления карточки */
popupConfirmDeleteBtn.addEventListener("click", confirmRemove);
