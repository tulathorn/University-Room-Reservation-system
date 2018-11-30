const UserModel = require("./model");

module.exports = {
  find: async data => {
    let response = await UserModel.getUser(data);
    return response;
  },
  create: async data => {
    let response = await UserModel.createUser(data);
    return response;
  },
  update: async data => {
    let response = await UserModel.updateUser(data);
    return response;
    // return {
    //   message: "update user called"
    // };
  },
  delete: async data => {
    let response = await UserModel.deleteUser(data);
    return response;
    // return {
    //   message: "delete user called"
    // };
  }
};
