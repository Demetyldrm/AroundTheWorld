export default class UserInfo {
  constructor(profileNameElement, profileJobElement) {
    this._profileName = profileNameElement;
    this._profileJob = profileJobElement;
  }

  getUserInfo() {
    return {
      name: this._profileName.textContent,
      description: this._profileJob.textContent,
    };
  }

  setUserInfo(userData) {
    this._profileName.textContent = userData.name;
    this._profileJob.textContent = userData.description;
  }
}
