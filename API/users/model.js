const Sequelize = require("sequelize");
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
    EmailAddress: {
      type: Sequelize.STRING,
      allowNull: false
    },
    IsAdmin: {
      type: Sequelize.BOOLEAN,
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
  getUser: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let condition = args || "";
        let data = await UserModel.findAll({
          attributes: [
            "UserID",
            "FirstName",
            "LastName",
            "EmailAddress",
            "IsAdmin",
            "Status"
          ],
          where: {
            ...condition
          }
        });
        resolve(data);
      } catch (err) {
        console.log(err);
        reject(err);
      }
    });
  }
};
