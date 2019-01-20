const Sequelize = require("sequelize");
const sequelize = require("../sequelize");

const RoomInformationModel = sequelize.define(
  "RoomInformation",
  {
    RoomID: {
      type: Sequelize.INT,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    RoomName: {
      type: Sequelize.CHAR,
      allowNull: false
    },
    Picture: {
      type: Sequelize.STRING,
      allowNull: true
    },
    Building: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Floor: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    RoomNumber: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    PeopleCapacity: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    ClosingDay: {
      type: Sequelize.CHAR,
      allowNull: true
    },
    OpenTime: {
      type: Sequelize.TIME,
      allowNull: true
    },
    CloseTime: {
      type: Sequelize.TIME,
      allowNull: true
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

const EquipmentModel = sequelize.define(
  "Equipment",
  {
    RoomID: {
      type: Sequelize.INT,
      primaryKey: true,
      allowNull: false
    },
    HasTeacherComputers: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    HasStudentComputers: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    HasProjector: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    HasWhiteboard: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    },
    HasVisualizer: {
      type: Sequelize.BOOLEAN,
      allowNull: true
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
);

RoomInformationModel.hasOne(EquipmentModel);

module.exports = {
  getAllRooms: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await RoomInformationModel.findAll({});
        resolve(data);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  },
  getRoom: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let condition = args;
        let data = await RoomInformationModel.findAll({
          where: {
            ...condition
          },
          include: [{ model: EquipmentModel, as: "RoomID" }]
        });
        resolve(data);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  },
  createRoom: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = "test";
        resolve(data);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  },
  updateRoom: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = "test";
        resolve(data);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  },
  deleteRoom: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = "test";
        resolve(data);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
};
