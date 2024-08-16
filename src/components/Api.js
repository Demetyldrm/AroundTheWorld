export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  async getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        console.log("Error");
        return Promise.reject(`Error: ${res.status}`);
      })
      .then((result) => {
        console.log(result);
        return result;
      })
      .catch((err) => console.error(err));
  }
  async getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          console.log(res.ok);
          return res.json();
        }
        return Promise.reject(`Error getting initial cards: ${res.status}`);
      })
      .catch((err) => console.error(err));
  }

  async editProfile({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            console.error("Error from server:", error);
            return Promise.reject(`Error: ${res.status}`);
          });
        }
        return res.json();
      })
      .catch((err) => {
        console.error("Error updating profile:", err);
      });
  }

  async addNewCard(title, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: title,
        link: link,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  }

  async deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          console.log("This card has been deleted");
          return res.json();
        }
        return Promise.reject(`Error deleting card: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async cardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
    })
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async cardUnlike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
    })
      .then((res) => {
        if (res.ok) {
          console.log(`Unlike Status: ${res.status}`);
          return res.json();
        }
        console.log("Unable To Unlike");
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async updateAvatar(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    })
      .then((res) => {
        if (res.ok) {
          console.log(`Avatar Status: ${res.status}`);
          return res.json();
        }
        console.log("Unable to change the Avatar");
        return Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
