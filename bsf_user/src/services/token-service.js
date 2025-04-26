class TokenService {
  getUserName() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.userName;
  }

  getName() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.name;
  }

  getUserId() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.userId;
  }

  getUserBalance() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.balance;
  }

  getLocalRefreshToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.refreshToken;
  }

  getLocalAccessToken() {
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.accessToken;
  }

  updateLocalAccessToken(token) {
    let user = JSON.parse(localStorage.getItem("user"));
    user.accessToken = token;
    localStorage.setItem("user", JSON.stringify(user));
  }

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  setUser(user) {
    console.log("user to be added is ", JSON.stringify(user));
    localStorage.setItem("user", JSON.stringify(user));
  }

  removeUser() {
    localStorage.removeItem("user_NotPopup");
    localStorage.removeItem("user");
  }

  notificationPopupDisplayed(userId) {
    localStorage.setItem("user_NotPopup", 1);
  }

  isNotificationPopupDisplayed(userId) {
    console.log(userId);
    return localStorage.getItem("user_NotPopup");
  }
}

export default new TokenService();