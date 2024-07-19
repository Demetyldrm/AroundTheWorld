import Popup from "./Popoup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardImageElement = this._popupElement.querySelector(".image-modal");
    this._cardTitleElement =
      this._popupElement.querySelector(".modal__caption");
  }

  open(data) {
    this._cardImageElement.src = data._link;
    this._cardImageElement.alt = data._name;
    this._cardTitleElement.textContent = data._name;
    super.open();
  }
}
