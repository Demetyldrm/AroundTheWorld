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
const profileEditForm = profileEditModal.querySelector(".modal__form");
const addCardModal = document.querySelector("#add-card-modal");
const addCardFormElement = addCardModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");

//Creating card instances

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

//PopupWithImage.js
const newImagePopup = new PopupWithImage("#image-modal");
newImagePopup.setEventListeners();

//PopupWIthForm.js
const editProfilePopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileEditSubmit,
});
editProfilePopup.setEventListeners();

//add new card
const newCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: handleAddCardFormSubmit,
});
newCardPopup.setEventListeners();

//UserInfo
const userInfo = new UserInfo(profileNameElement, profileJobElement);

/* --------------------- Functions -----------------------------------*/

function handleProfileEditSubmit(userData) {
  const name = userData.title;
  const description = userData.description;
  userInfo.setUserInfo({ name, description });
  editProfilePopup.close();
  profileEditForm.reset();
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
  const { description, name } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
  editProfilePopup.open();
});

// Add new card form
addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

const profileEditFormValidator = new FormValidator(settings, profileEditForm);
profileEditFormValidator.enableValidation();
const addFormValidator = new FormValidator(settings, addCardModal);
addFormValidator.enableValidation();
