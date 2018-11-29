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
    freezeTableName: true
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
    HasStudentsComputers: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    HasProjector: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    HasWhiterboard: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    HasVisualizer: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  },
  {
    freezeTableName: true
  }
);
