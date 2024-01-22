const UserFileSystemDao = require('../dao/userFileSystemDao'); // Asegúrate de tener el nombre correcto
const UserMongoDao = require('../dao/userMongoDao'); // Asegúrate de tener el nombre correcto
const { isMongoEnabled } = require('../../utils'); // Asegúrate de tener el nombre correcto

class UserManager {
    constructor() {
        if (isMongoEnabled()) {
            this.userDao = new UserMongoDao();
        } else {
            this.userDao = new UserFileSystemDao();
        }
    }

    async getUsers() {
        return this.userDao.getUsers();
    }

    async getUserById(userId) {
        return this.userDao.getUserById(userId);
    }

    async createUser(newUser) {
        return this.userDao.createUser(newUser);
    }

    async updateUser(userId, updatedFields) {
        return this.userDao.updateUser(userId, updatedFields);
    }

    async deleteUser(userId) {
        return this.userDao.deleteUser(userId);
    }

    // Puedes agregar otras operaciones según sea necesario
}

module.exports = UserManager;
