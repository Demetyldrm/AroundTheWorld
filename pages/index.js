import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

const initialCards = [
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

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const addCardModal = document.querySelector("#add-card-modal");
const addCardCloseButton = addCardModal.querySelector(".modal__close");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);
const addNewCardButton = document.querySelector(".profile__add-button");

const addCardFormElement = addCardModal.querySelector(".modal__form");
const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card-template")
  .content.querySelector(".card");
const cardTitleInput = addCardFormElement.querySelector(".modal__input_title");

const cardUrlInput = addCardFormElement.querySelector(".modal__input_type_url");

const previewImageModal = document.querySelector("#image-modal");
const previewImageEl = previewImageModal.querySelector(".modal__image");
const previewImageTextEl = previewImageModal.querySelector(".modal__caption");
const modalImageCloseButton = previewImageModal.querySelector(
  "#modal-close-button"
);

/*----------------------Validation------------------------------------ */

const settings = {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
  formSelector: ".modal__form",
};

const editFormElement = profileEditModal.querySelector(".modal__form");
const addFormElement = addCardModal.querySelector(".modal__form");

const editFormValidator = new FormValidator(settings, editFormElement);
const addFormValidator = new FormValidator(settings, addFormElement);
editFormValidator.enableValidation();
addFormValidator.enableValidation();

/* ---------------------Functions ------------------------------------ */
// function renderCard(cardData, method = "prepend") {
//   const card = new Card(cardData, cardSelector, handleImageClick).getView();
//   // const cardElement = getCardElement(item);
//   cardsListEl[method](card);
// }
function addCard(cardData) {
  const card = new Card(cardData, "#card-template", handleImageClick);
  return card.getView();
}

function renderCard(cardData, cardListEl) {
  const cardElement = addCard(cardData);
  cardListEl.prepend(cardElement);
}

function handleImageClick(cardData) {
  previewImageEl.src = cardData.link;
  previewImageEl.alt = cardData.name;
  previewImageTextEl.textContent = cardData.name;
  openModal(previewImageModal);
}

// function getCardElement(cardData) {
//   const cardElement = cardTemplate.cloneNode(true);
//   const cardImageEl = cardElement.querySelector("#card-image");
//   const cardSubtitleEl = cardElement.querySelector("#card-subtitle");
//   const likeButton = cardElement.querySelector("#card-like-button");
//   const deleteButton = cardElement.querySelector("#card-delete-button");

//   likeButton.addEventListener("click", () => {
//     likeButton.classList.toggle("card__like-button_active");
//   });

//   deleteButton.addEventListener("click", () => {
//     cardElement.remove();
//   });

//   cardImageEl.addEventListener("click", () => {
//     openModal(previewImageModal);
//     previewImageEl.src = cardData.link;
//     previewImageEl.alt = cardData.name;
//     previewImageTextEl.textContent = cardData.name;
//   });

//   cardImageEl.src = cardData.link;
//   cardSubtitleEl.textContent = cardData.name;
//   cardImageEl.alt = cardData.name;
//   return cardElement;
// }

modalImageCloseButton.addEventListener("click", () => {
  closePopup(previewImageModal);
});

/* ---------------------Event handlers -----------------------------------*/

function handleProfileEditSubmit(e) {
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardFormSubmit(e) {
  e.preventDefault();
  const name = cardTitleInput.value;
  const link = cardUrlInput.value;
  renderCard({ name, link }, cardListEl);
  e.target.reset();
  addFormValidator.resetValidation();
  e.target.reset();
}

function closeModalByEsc(evt) {
  if (evt.key === "Escape") {
    const openModal = document.querySelector(".modal_opened");
    closePopup(openModal);
  }
}

function closeModalByClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  document.addEventListener("keydown", closeModalByEsc);
  modal.addEventListener("mousedown", closeModalByClick);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  document.removeEventListener("keydown", closeModalByEsc);
  modal.removeEventListener("mousedown", closeModalByClick);
}

/* --------------------- Event Listeners ----------------------------------*/

profileEditButton.addEventListener("click", () => {
  profileTitleInput.value = profileTitle.textContent;
  profileDescriptionInput.value = profileDescription.textContent;
  openModal(profileEditModal);
  editFormValidator.resetValidation();
});

profileEditCloseButton.addEventListener("click", () =>
  closePopup(profileEditModal)
);

addNewCardButton.addEventListener("click", () => openModal(addCardModal));
addCardCloseButton.addEventListener("click", () => closePopup(addCardModal));

profileEditForm.addEventListener("submit", handleProfileEditSubmit);
addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

initialCards.forEach((cardData) => renderCard(cardData, cardListEl));
