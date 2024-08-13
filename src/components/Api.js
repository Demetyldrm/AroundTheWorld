export default class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  async getUserInfo() {
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "GET",
      headers: {
        authorization: "7c3f5c74-509e-4796-a690-f2cafe6e2b28",
      },
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
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "GET",
      headers: {
        authorization: "7c3f5c74-509e-4796-a690-f2cafe6e2b28",
      },
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
    return fetch("https://around-api.en.tripleten-services.com/v1/users/me", {
      method: "PATCH",
      headers: {
        Authorization: "7c3f5c74-509e-4796-a690-f2cafe6e2b28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, about }),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            console.error("Error details from server:", error);
            return Promise.reject(`Error: ${res.status}`);
          });
        }
        return res.json();
      })
      .catch((err) => {
        console.error("Error during profile update:", err);
      });
  }

  async addNewCard(title, link) {
    return fetch("https://around-api.en.tripleten-services.com/v1/cards", {
      method: "POST",
      headers: {
        authorization: "7c3f5c74-509e-4796-a690-f2cafe6e2b28",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: title,
        link: link,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  }

  async deleteCard(cardId) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}`,
      {
        method: "DELETE",
        headers: {
          authorization: "7c3f5c74-509e-4796-a690-f2cafe6e2b28",
          "Content-type": "application/json",
        },
      }
    )
      .then((res) => {
        if (res.ok) {
          console.log("This post has been deleted");
          return res.json();
        }
        console.log("Trouble deleting card");
        return Promise.reject(`Error deleting card: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async cardLike(cardId) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`,
      {
        method: "PUT",
        headers: {
          authorization: "7c3f5c74-509e-4796-a690-f2cafe6e2b28",
        },
      }
    )
      .then((res) => {
        return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  async cardUnlike(cardId) {
    return fetch(
      `https://around-api.en.tripleten-services.com/v1/cards/${cardId}/likes`,
      {
        method: "DELETE",
        headers: {
          authorization: "7c3f5c74-509e-4796-a690-f2cafe6e2b28",
        },
      }
    )
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
    try {
      const res = await fetch(
        "https://around-api.en.tripleten-services.com/v1/users/me/avatar",
        {
          method: "PATCH",
          headers: {
            authorization: "7c3f5c74-509e-4796-a690-f2cafe6e2b28",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            avatar: avatarUrl,
          }),
        }
      );

      if (!res.ok) {
        throw new Error(`Error updating: ${res.status}`);
      }

      return await res.json();
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
