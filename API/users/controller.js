const UserModel = require("./model");

module.exports = {
  find: async params => {
    console.log(params);
    let data = await UserModel.getUser();
    // console.log("Response", data);
    return data;
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
