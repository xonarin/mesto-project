export default class UserInfo {
  constructor(name, about, avatar) {
    this._name = document.querySelector(name);
    this._about = document.querySelector(about);
    this._avatar = document.querySelector(avatar);
  }

  getUserInfo() {
    return {
      name: this._name.textContent,
      about: this._about.textContent
    }
  }

  setUserInfo(res) {
    this._userId = res._id;
    this._name.textContent = res.name;
    this._about.textContent = res.about;
    this._avatar.src = res.avatar;
  }

  getProfileInfo() {
    return this._userId;
  }
}
