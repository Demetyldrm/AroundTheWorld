import Popup from "./Popoup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._cardImageElement = this._popupElement.querySelector(".modal__image");
    this._cardTitleElement =
      this._popupElement.querySelector(".modal__caption");
  }

  open(data) {
    this._cardImageElement.src = data.link;
    this._cardImageElement.alt = data.name;
    this._cardTitleElement.textContent = data.name;
    super.open();
  }
}
