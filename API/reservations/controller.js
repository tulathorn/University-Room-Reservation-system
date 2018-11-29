const ReservationsModel = require("./model");

module.exports = {
  find: async data => {
    return {
      message: "find booking called"
    };
  },
  create: async data => {
    return {
      message: "create booking called"
    };
  },
  update: async data => {
    return {
      message: "update booking called"
    };
  },
  delete: async data => {
    return {
      message: "delete booking called"
    };
  }
};
