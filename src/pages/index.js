// index.js

import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import Api from "../components/Api.js";
import PopupDeleteCard from "../components/PopupDeleteCard.js";
import {
  profileEditForm,
  settings,
  avatarEditFormElement,
  profileNameElement,
  profileJobElement,
  addCardFormElement,
  profileAvatarEditButton,
  profileAvatarElement,
  profileEditButton,
  addNewCardButton,
  profileAvatarClick,
  profileTitleInput,
  profileDescriptionInput,
} from "../utils/constants.js";

/* -------------------------------------------------- API ---------------------------------------------- */

const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "7c3f5c74-509e-4796-a690-f2cafe6e2b28",
    "Content-Type": "application/json",
  },
});

/* -------------------------------------------------- User Info ---------------------------------------- */

const userInfo = new UserInfo(profileNameElement, profileJobElement);

// Load user info from API
api
  .getUserInfo()
  .then((userData) => {
    if (userData) {
      userInfo.setUserInfo({
        name: userData.name,
        description: userData.about,
      });
      profileAvatarElement.src = userData.avatar;
    }
  })
  .catch((err) => console.log("Error loading user info:", err));

/* -------------------------------------------------- Cards ------------------------------------------- */

const createCard = (cardData) => {
  const card = new Card(
    cardData,
    "#card-template",
    () => {
      handleImageClick.open(cardData);
    },
    (cardId, cardElement) => {
      handleDeleteCard.open(cardId, cardElement);
    },
    handleLikeClick,
    api
      .cardLike(cardData)
      .then(() => {
        console.log("like function is working ");
      })
      .catch((err) => {
        console.log("Error:", err);
      })
  );
  return card.getView();
};
// Function to render a card
const renderCard = (cardData) => {
  const card = createCard(cardData);
  section.addItem(card);
};

// Declare section variable
let section;

// Fetching the initial cards
api
  .getInitialCards()
  .then((cardData) => {
    if (cardData) {
      section = new Section(
        {
          items: cardData,
          renderer: renderCard,
        },
        ".cards__list"
      );
      section.renderItems();
    }
  })
  .catch((err) => console.log("Error loading initial cards:", err));

/* -------------------------------------------------- Popups ---------------------------------------- */

// Image preview popup
const newImagePopup = new PopupWithImage("#image-modal");
newImagePopup.setEventListeners();

// Edit profile popup
const editProfilePopup = new PopupWithForm({
  popupSelector: "#profile-edit-modal",
  handleFormSubmit: handleProfileEditSubmit,
});
editProfilePopup.setEventListeners();

// Add new card popup
const newCardPopup = new PopupWithForm({
  popupSelector: "#add-card-modal",
  handleFormSubmit: handleAddCardFormSubmit,
});
newCardPopup.setEventListeners();

// Delete card confirmation popup
const deleteCardPopup = new PopupDeleteCard({
  popupSelector: "#delete-card-modal",
});
deleteCardPopup.setEventListeners();

// Edit avatar popup
const avatarEditPopup = new PopupWithForm({
  popupSelector: "#avatar-edit-modal",
  handleFormSubmit: handleAvatarEditSubmit,
});
avatarEditPopup.setEventListeners();

/* -------------------------------------------------- Event Handlers ---------------------------------------- */

function handleProfileEditSubmit(userData) {
  const name = userData.title;
  const description = userData.description;
  api
    .editProfile(name, description)
    .then(() => {
      userInfo.setUserInfo({ name, description });

      editProfilePopup.close();
      profileEditForm.reset();
    })
    .catch((err) => {
      return console.error(err);
    });
}

function handleAddCardFormSubmit(newCardData) {
  const name = newCardData.title;
  const alt = newCardData.title;
  const link = newCardData.url;
  console.log(name, alt, link, newCardData);

  renderCard({ name, link, alt });
  newCardPopup.close();
  addCardFormValidator.disableButton();
}

// Handle card image click
function handleImageClick(cardData) {
  newImagePopup.open(cardData);
}

// Handle card delete click
function handleDeleteCard(cardId) {
  deleteCardPopup.open();
  deleteCardPopup.handleDeleteConfirm();
  api
    .deleteCard(cardId)
    .then(() => {
      handleDeleteCard();
      deleteCardPopup.close();
    })
    .catch(console.error);
}

// Function to handle like/unlike
function handleLikeClick(cardId, isLiked, cardElement) {
  if (isLiked) {
    api
      .cardUnlike(cardId)
      .then(() => {
        cardElement
          .querySelector(".card__like-button")
          .classList.remove("card__like-button");
      })
      .catch((err) => console.log("Error unliking card:", err));
  } else {
    api
      .cardLike(cardId)
      .then(() => {
        cardElement
          .querySelector(".card__like-button")
          .classList.add("card__like-button");
      })
      .catch((err) => console.log("Error liking card:", err));
  }
}

function handleAvatarEditSubmit(avatarUrl) {
  const newAvatarUrl = avatarUrl.avatar;
  console.log(avatarUrl);
  profileAvatarEditButton.textContent = "Avatar picture";

  api
    .updateAvatar(newAvatarUrl)
    .then(() => {
      userInfo.setUserInfo(newAvatarUrl);
      avatarEditPopup.close();
      avatarFormValidator.reset();
    })
    .catch((err) => {
      console.error(`Error ${err}`);
    });
}

/* -------------------------------------------------- Event Listeners ---------------------------------------- */

// Edit Profile button
profileEditButton.addEventListener("click", () => {
  const { name, description } = userInfo.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
  editProfilePopup.open();
});

// Add new card button
addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
});

// Edit Avatar button
profileAvatarEditButton.addEventListener("click", () => {
  avatarEditPopup.open(); // Opens the avatar edit modal
});

// Click on avatar pic to edit avatar
profileAvatarClick.addEventListener("click", () => {
  avatarEditPopup.open();
});

/* -------------------------------------------------- Form Validators ---------------------------------------- */

// Initialize form validators
const profileEditFormValidator = new FormValidator(settings, profileEditForm);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(settings, addCardFormElement);
addCardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(settings, avatarEditFormElement);
avatarFormValidator.enableValidation();
