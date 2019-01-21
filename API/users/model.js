const Sequelize = require("sequelize");
const sequelize = require("../sequelize");

const UserModel = sequelize.define(
  "UserInfo",
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
);

module.exports = {
  getUser: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let condition = args || "";
        let data = await UserModel.findAll({
          where: {
            ...condition
          }
        });
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  },
  createUser: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await UserModel.create(args);
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  },
  updateUser: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await UserModel.update(args, {
          where: { UserID: args.UserID }
        });
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  },
  deleteUser: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await UserModel.destroy({
          where: { UserID: args.UserID }
        });
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
};
