const Sequelize = require('sequelize')
const sequelize = require('../sequelize')

const UserSchema = require('./schema')

module.exports = {
  getUser: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let condition = args || ''
        let data = await UserSchema.findAll({
          where: {
            ...condition
          }
        })
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  },
  createUser: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await UserSchema.create(args)
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  },
  updateUser: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await UserSchema.update(args, {
          where: { UserID: args.UserID }
        })
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  },
  deleteUser: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await UserSchema.destroy({
          where: { UserID: args.UserID }
        })
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }
}
