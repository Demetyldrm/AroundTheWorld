export default class Card {
  constructor(
    cardData,
    cardSelector,
    handleImageClick,
    handleCardDelete,
    handleLikeIcon
  ) {
    this._id = cardData._id;
    this._name = cardData.name;
    this._link = cardData.link;
    this._handleImageClick = handleImageClick;
    this._cardSelector = cardSelector;
    this._handleCardDelete = handleCardDelete;
    this._isLiked = cardData.isLiked;
    this._handleLikeIcon = handleLikeIcon;
  }

  _setEventListeners() {
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => {
      this._handleLikeIcon(this._id, this._isLiked, this._cardElement, this);
    });

    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._deleteButton.addEventListener("click", () => {
      this._handleCardDelete(this._id, this);
    });

    this._cardImageElement.addEventListener("click", () => {
      this._handleImageClick({
        name: this._name,
        link: this._link,
        src: this._name,
      });
    });
  }

  updateLikes() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  _updateLikesView() {
    if (this._isLiked) {
      this._likeButton.classList.add("card__like-button_active");
    } else {
      this._likeButton.classList.remove("card__like-button_active");
    }
  }

  deleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  handleLikeIcon() {
    this._likeButton.classList.toggle("card__like-button_active");
  }

  getView() {
    this._cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    this._cardImageElement = this._cardElement.querySelector(".card__image");
    this._cardImageElement.src = this._link;
    this._cardImageElement.alt = this._name;
    this._cardTitle = this._cardElement.querySelector(".card__subtitle");
    this._cardTitle.textContent = this._name;
    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._updateLikesView();
    this._setEventListeners();
    return this._cardElement;
  }
}
