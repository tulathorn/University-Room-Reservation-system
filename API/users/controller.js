const UserModel = require("./model");

module.exports = {
  find: async data => {
    let response = await UserModel.getUser(data);
    return response;
    // return {
    //   message: "find user called"
    // };
  },
  create: async data => {
    return {
      message: "create user called"
    };
  },
  update: async data => {
    return {
      message: "update user called"
    };
  },
  delete: async data => {
    return {
      message: "delete user called"
    };
  }
};
