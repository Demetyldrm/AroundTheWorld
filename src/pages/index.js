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
  addCardFormElement,
  addCardSubmitButton,
  profileAvatarEditButton,
  profileEditButton,
  addNewCardButton,
  profileTitleInput,
  profileDescriptionInput,
  deleteCardElement,
  avatarSaveButton,
  profileSubmitButton,
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
const userInfo = new UserInfo({
  name: ".profile__title",
  about: ".profile__description",
  avatarElement: ".profile__image",
});

api
  .getUserInfo()
  .then((profileData) => {
    if (profileData) {
      userInfo.setUserInfo({
        name: profileData.name,
        about: profileData.about,
      });
      userInfo.changeAvatar(profileData.avatar);
    }
  })
  .catch((err) => console.log("Error loading user info:", err));

/* -------------------------------------------------- Cards ------------------------------------------- */

const createCard = (cardData) => {
  console.log("Card Data:", cardData);
  const card = new Card(
    cardData,
    "#card-template",
    (cardData) => {
      handleImageClick(cardData);
    },
    (cardId, card) => {
      console.log("Card ID:", cardData._id || cardData.id);
      handleDeleteModal(cardData, card);
    },
    (cardId, isLiked, cardElement) => {
      handleLikeClick(cardId, isLiked, cardElement);
    }
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

function handleProfileEditSubmit(profileData) {
  console.log("Profile Data Submitted:", profileData);

  const processedProfileData = {
    title: profileData.title || " Name",
    description: profileData.description || " About",
  };

  profileSubmitButton.textContent = "Saving...";
  api
    .editProfile({
      name: processedProfileData.title,
      about: processedProfileData.description,
    })
    .then(() => {
      userInfo.setUserInfo({
        name: processedProfileData.title,
        about: processedProfileData.description,
      });
      editProfilePopup.close();
    })
    .catch((err) => {
      console.error("Error updating profile:", err);
    })
    .finally(() => {
      profileSubmitButton.textContent = "Saved";
    });
}

function handleAddCardFormSubmit(newCardData) {
  const name = newCardData.title;
  const alt = newCardData.title;
  const link = newCardData.url;

  addCardSubmitButton.textContent = "Saving...";

  api
    .addNewCard(name, link)
    .then((cardData) => {
      renderCard({
        name: cardData.name,
        link: cardData.link,
        alt: cardData.name,
        _id: cardData,
      });
      addCardFormElement.reset();

      newCardPopup.close();
      addCardFormValidator.resetForm();
    })
    .catch((err) => {
      console.error("Error adding card:", err);
    })
    .finally(() => {
      addCardSubmitButton.textContent = "Save";
    });
}

function handleImageClick(cardData) {
  newImagePopup.open(cardData);
}

function handleDeleteModal(cardData, card) {
  const cardId = cardData._id || cardData.id;

  if (!cardId) {
    console.error("Card ID is undefined or invalid!");
    return;
  }

  deleteCardPopup.setFormSubmitHandler(() => {
    api
      .deleteCard(cardId)
      .then(() => {
        card._deleteCard();
        deleteCardPopup.close();
      })
      .catch(console.error);
  });

  deleteCardPopup.open();
}

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

function handleAvatarEditSubmit(inputValues) {
  const avatarUrl = inputValues.avatar;

  console.log("Changing the avatar with URL:", avatarUrl);

  if (!avatarUrl || typeof avatarUrl !== "string" || avatarUrl.trim() === "") {
    return;
  }

  avatarSaveButton.textContent = "Saving...";

  api
    .updateAvatar(avatarUrl)
    .then((userData) => {
      if (userData.avatar) {
        userInfo.changeAvatar(userData.avatar);
      } else {
        console.error("Error returning Avatar URL.");
      }

      avatarEditPopup.close();
      avatarFormValidator.resetForm();
    })
    .catch((err) => {
      console.error(`Error updating avatar: ${err}`);
    })
    .finally(() => {
      avatarSaveButton.textContent = "Saved";
    });
}

/* -------------------------------------------------- Event Listeners ---------------------------------------- */

// Edit Profile button
profileEditButton.addEventListener("click", () => {
  const userInput = userInfo.getUserInfo();
  profileTitleInput.value = userInput.name;
  profileDescriptionInput.value = userInput.description;
  editProfilePopup.open();
  profileEditFormValidator.resetForm();
});

// Add new card button
addNewCardButton.addEventListener("click", () => {
  newCardPopup.open();
  addCardFormValidator._toggleButtonState();
});

// Open the avatar edit modal
profileAvatarEditButton.addEventListener("click", () => {
  avatarEditPopup.open();
  avatarFormValidator.resetForm();
});

// Handle the form submission for changing the avatar
avatarEditFormElement.addEventListener("submit", (event) => {
  event.preventDefault();

  const avatarUrl = document.querySelector("#avatar-url-input").value;
  handleAvatarEditSubmit(avatarUrl);
});

/* -------------------------------------------------- Form Validators ---------------------------------------- */

// Initialize form validators
const profileEditFormValidator = new FormValidator(settings, profileEditForm);
profileEditFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(settings, addCardFormElement);
addCardFormValidator.enableValidation();

const avatarFormValidator = new FormValidator(settings, avatarEditFormElement);
avatarFormValidator.enableValidation();

const deleteFormValidator = new FormValidator(settings, deleteCardElement);
deleteFormValidator.enableValidation();
