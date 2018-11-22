const sequelize = require("../sequelize");

const UserModel = sequelize.define(
  "User",
  {
    UserID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
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
    Role: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    Status: {
      type: Sequelize.BOOLEAN,
      allowNull: false
    }
  },
  {
    freezeTableName: true
  }
);

module.exports = {
  getUser = args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await MeterModel.findAll({})
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }
}