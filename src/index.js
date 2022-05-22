import './pages/index.css'; // добавьте импорт главного файла стилей
import { handleNewCardSubmit } from './components/card.js';
import { getProfileInfo, editProfile, updateAvatar } from './components/api.js';
import {
  openPopup,
  closePopup,
  popupAddCard,
  popupProfile,
  popupAvatar
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

getProfileInfo()
  .then((profile) => {
    profileId = profile._id;
    profileUserName.textContent = profile.name;
    profileUserDescription.textContent = profile.about;
    profileAvatarImage.src = profile.avatar;
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
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closePopup(popupProfile);
      profileForm.reset();
    })

}


function handleAvatarEditSubmit(event) {
  event.preventDefault();
  formAvatar.elements.submit.textContent = 'Сохранение...';
  updateAvatar(formAvatar.elements.link.value)
    .then(() => {
      profileAvatarImage.src = formAvatar.elements.link.value;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      closePopup(popupAvatar);
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
