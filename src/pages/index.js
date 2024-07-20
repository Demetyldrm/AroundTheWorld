import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import { initialCards, settings } from "../utils/constants.js";

/* -------------------------------------------------- Elements ----------------------------------------*/

const profileEditButton = document.querySelector("#profile-edit-button");
const addNewCardButton = document.querySelector(".profile__add-button");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const profileNameElement = document.querySelector(".profile__title");
const profileJobElement = document.querySelector(".profile__description");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const addCardFormElement = document.querySelector("#add-card-form");
const cardListEl = document.querySelector(".cards__list");

//Creating card instances
//Cards

function createCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}
const renderCard = (cardData) => {
  const card = createCard(cardData);
  section.addItem(card);
};

//Section.js
const section = new Section(
  { items: initialCards, renderer: renderCard },
  ".cards__list"
);

section.renderItems();

//PopupWIthForm.js
const editProfilePopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileEditSubmit,
});
editProfilePopup.setEventListeners();

const newCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: handleAddCardFormSubmit,
});
newCardPopup.setEventListeners();

//PopupWithImage.js
const newImagePopup = new PopupWithImage("#image-modal");
newImagePopup.setEventListeners();

//UserInfo
const userInfo = new UserInfo(profileNameElement, profileJobElement);

/* --------------------- Functions -----------------------------------*/

function handleProfileEditSubmit(userData) {
  userInfo.setUserInfo(userData);
  editProfilePopup.close();
}

function handleAddCardFormSubmit(userInfo) {
  const name = userInfo.title;
  const link = userInfo.url;
  renderCard({ name, link }, cardListEl);
  addCardFormElement.reset();
  newCardPopup.close();
  addFormValidator.disableButton();
}

function handleImageClick(cardData) {
  newImagePopup.open(cardData);
}

/* --------------------- Event Listeners ----------------------------------*/
// Edit Profile form
profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileNameElement.textContent;
  profileDescriptionInput.value = profileJobElement.textContent.trim();
  editProfilePopup.open();
});

// Add new card form
addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
  addFormValidator._toggleButtonState();
});

const profileEditFormValidator = new FormValidator(settings, profileEditModal);
profileEditFormValidator.enableValidation();
const addFormValidator = new FormValidator(settings, addCardModal);
addFormValidator.enableValidation();
