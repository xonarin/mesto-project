import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this.imgDescription = this.element.querySelector(".popup__description");
    this.img = this.element.querySelector(".popup__image");
  }

  openPopup(name, img) {
    super.openPopup();
    this.img.alt = name;
    this.img.src = img;
    this.imgDescription.textContent = name;
  }

}
