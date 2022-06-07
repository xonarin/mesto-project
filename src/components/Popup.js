export default class Popup {
  // Поиск селектора
  constructor(popupSelector) {
    this.element = document.querySelector(popupSelector);
  }
  // Открытие попапа
  openPopup() {
    this.element.classList.add("popup_opened");
    document.addEventListener('keydown', this._handleCloseCardWithEsc);
  }
  // Навешивание слушателей
  setEventListeners() {
    this.element.addEventListener("click", (evt) => {
      if (evt.target.classList.contains("popup_opened")) {
        this.closePopup();
      }
      if (evt.target.classList.contains("form__close")) {
        this.closePopup();
      }
    })
  }

  // Нажатие на ЕSC и закрытие попапа
  _handleCloseCardWithEsc = (evt) => {
    if (evt.key === "Escape") {
      this.closePopup();
    }
  };

  // Закрытие попапа стандартно - кнопкой
  closePopup() {
    this.element.classList.remove("popup_opened");
    document.removeEventListener("keydown", this._handleCloseCardWithEsc);
  }
}
