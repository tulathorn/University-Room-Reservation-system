const Sequelize = require('sequelize')
const sequelize = require('../sequelize')

const UserSchema = sequelize.define(
  'UserInfo',
  {
    UserID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    UsernameID: {
      type: Sequelize.CHAR,
      allowNull: false
    },
    FirstName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    LastName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    EmailAddress: {
      type: Sequelize.STRING,
      allowNull: false
    },
    IsAdmin: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    },
    IsBan: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

module.exports = UserSchema
