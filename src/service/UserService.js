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


  async createUser(userDetails) {
    const newUserId = await this.userDao.insertUser(userDetails);
    return newUserId;
  }
}

export default UserService;
