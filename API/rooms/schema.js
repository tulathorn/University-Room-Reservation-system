const Sequelize = require('sequelize')
const sequelize = require('../sequelize')

const RoomInformationSchema = sequelize.define(
  'RoomInformation',
  {
    RoomID: {
      type: Sequelize.INTEGER,
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
)

const EquipmentSchema = sequelize.define(
  'Equipment',
  {
    RoomID: {
      type: Sequelize.INTEGER,
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
)

module.exports = { RoomInformationSchema, EquipmentSchema }
