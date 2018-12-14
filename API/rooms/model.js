const Sequelize = require("sequelize");
const sequelize = require("../sequelize");

const RoomInformationModel = sequelize.define(
  "RoomInformation",
  {
    RoomID: {
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    },
    Picture: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Building: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Floor: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    RoomNumber: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    PeopleCapacity: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    ClosingDay: {
      type: Sequelize.STRING,
      allowNull: false
    },
    OpenTime: {
      type: Sequelize.TIME,
      allowNull: false
    },
    CloseTime: {
      type: Sequelize.TIME,
      allowNull: false
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
      type: Sequelize.STRING,
      primaryKey: true,
      allowNull: false
    },
    HasTeacherComputers: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    HasStudentComputers: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    HasProjector: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    HasWhiteboard: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    HasVisualizer: {
      type: Sequelize.BOOLEAN,
      allowNull: false
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
