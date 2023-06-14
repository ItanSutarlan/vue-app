/* istanbul ignore file */
const { User } = require("../models");

class UserTableTestHelper {
  static addUsers(users) {
    return User.bulkCreate(users);
  }

  static cleanTable() {
    return User.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  }
}

module.exports = UserTableTestHelper;
