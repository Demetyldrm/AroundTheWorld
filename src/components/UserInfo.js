export default class UserInfo {
  constructor({ name, about, avatarElement }) {
    this._title = document.querySelector(name);
    this._description = document.querySelector(about);
    this._avatarElement = document.querySelector(avatarElement);
  }

  getUserInfo() {
    return {
      name: this._title.textContent,
      about: this._description.textContent,
    };
  }

  setUserInfo({ name, about }) {
    this._title.textContent = name;
    this._description.textContent = about;
  }

  changeAvatar(avatar) {
    this._avatarElement.src = avatar;
  }
}
