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
    let response = await UserModel.createUser(data);
    return response;
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
