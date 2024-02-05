import UserDao from "../data/UserDao.js";

class UserService {
  constructor() {
    this.userDao = new UserDao();
  }

  async getUserData(id) {
    const userData = await this.userDao.getUserData(id);
    return userData;
  }

  async getAllUsers() {
    const users = await this.userDao.getAllUsers();
    return users;
  }

  async authenticateUser(userDetails) {
    const user = await this.userDao.authenticateUser(userDetails);
    return user;
  }

  async createUser(userDetails) {
    const user = await this.userDao.insertUser(userDetails);
    return user;
  }
}

export default UserService;
