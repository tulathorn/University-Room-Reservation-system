const RoomModel = require("./model");

module.exports = {
  find: async data => {
    return {
      message: "find room called"
    };
  },
  create: async data => {
    return {
      message: "create room called"
    };
  },
  update: async data => {
    return {
      message: "update room called"
    };
  },
  delete: async data => {
    return {
      message: "delete room called"
    };
  }
};
