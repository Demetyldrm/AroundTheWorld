export default class UserInfo {
  constructor({ name, description, avatarElement }) {
    this._name = document.querySelector(name);
    this._description = document.querySelector(description);
    this._avatarElement = document.querySelector(avatarElement);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      description: this._description.textContent,
    };
  }

  setUserInfo({ name, description }) {
    this._name.textContent = name;
    this._description.textContent = description;
  }

  changeAvatar(avatar) {
    this._avatarElement.src = avatar;
  }
}
