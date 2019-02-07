const Sequelize = require('sequelize')
const sequelize = require('../sequelize')

const ContactModel = sequelize.define(
  'Contact',
  {
    ContactID: {
      type: Sequelize.INTEGER,
      allowNull: false,
      autoIncrement: true
    },
    EmailAddress: {
      type: Sequelize.STRING
    },
    Title: {
      type: Sequelize.STRING
    },
    Detail: {
      type: Sequelize.STRING
    },
    DateTime: {
      type: Sequelize.DATE
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

module.exports = {
  getContacts: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await ContactModel.findAll({ where: { ...args } })
        resolve(data)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  },
  createContact: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await ContactModel.create(args)
        resolve(data)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  },
  updateContact: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await ContactModel.update(args, {
          where: { ContactID: args.ContactID }
        })
        resolve(data)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  },
  deleteContact: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await ContactModel.destroy({ where: { ContactID: args.ContactID } })
        resolve(data)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  }
}
