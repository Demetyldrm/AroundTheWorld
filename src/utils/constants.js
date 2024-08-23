export const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
];

/* -------------------------------------------------- Elements ----------------------------------------*/

export const profileEditButton = document.querySelector("#profile-edit-button");
export const addNewCardButton = document.querySelector(".profile__add-button");
export const profileTitleInput = document.querySelector("#profile-title-input");
export const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
export const addCardSubmitButton = document.querySelector(
  "#modal-add-card-button"
);
export const profileEditModal = document.querySelector("#profile-edit-modal");
export const profileEditForm = profileEditModal.querySelector(".modal__form");
export const addCardModal = document.querySelector("#add-card-modal");
export const addCardFormElement = addCardModal.querySelector(".modal__form");
export const cardListEl = document.querySelector(".cards__list");
export const deleteCardElement = document.querySelector("#card-delete-form");
export const profileSubmitButton = document.querySelector(
  "#modal-edit-submit-button"
);

export const avatarEditModal = document.querySelector("#avatar-edit-modal");
export const profileAvatarEditButton = document.querySelector(
  ".profile__avatar-edit-button"
);
export const avatarEditFormElement =
  avatarEditModal.querySelector(".modal__form");
export const profileAvatarElement = document.querySelector(".profile__image");
export const avatarSaveButton = document.querySelector(".modal__button");

export const settings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
  formSelector: ".modal__form",
};
