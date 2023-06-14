/* istanbul ignore file */
const { Customer } = require("../models");

class CustomerTableTestHelper {
  static addCustomer({ email, password }) {
    return Customer.create({ email, password });
  }

  static findCustomerById(id) {
    return Customer.findByPk(id);
  }

  static cleanTable() {
    return Customer.destroy({
      truncate: true,
      cascade: true,
      restartIdentity: true,
    });
  }
}

module.exports = CustomerTableTestHelper;
