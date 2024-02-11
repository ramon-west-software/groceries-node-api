import UserDao from "../data/UserDao.js";

class AuthService {
  constructor() {
    this.userDao = new UserDao();
  }

  async authenticateUser(userDetails) {
    const user = await this.userDao.authenticateUser(userDetails);
    return user;
  }
}

export default AuthService;
