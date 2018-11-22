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
    OperatingTime: {
      type: Sequelize.TIME,
      allowNull: false
    }
  },
  {
    freezeTableName: true
  }
);
