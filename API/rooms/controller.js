const RoomModel = require("./model");

module.exports = {
  find: async data => {
    console.log(data);
    if (data) {
      let response = await RoomModel.getRoom(data);
      return response;
    }
    let response = await RoomModel.getAllRooms();
    return response;
    // return {
    //   message: "find room called"
    // };
  },
  create: async data => {
    let response = await RoomModel.createRoom(data);
    return response;
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
