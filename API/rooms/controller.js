const RoomModel = require("./model");

module.exports = {
  find: async data => {
    console.log(data);
    if (data) {
      let response = await RoomModel.getRoom(data);
    }
    let response = await RoomModel.getAllRooms();
    return response;
    // return {
    //   message: "find room called"
    // };
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
