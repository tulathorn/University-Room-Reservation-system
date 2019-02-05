const Sequelize = require('sequelize')
const sequelize = require('../sequelize')

const RecurringReservationsModel = sequelize.define(
  'RecurringReservations',
  {
    BookingID: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    RoomID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    UserID: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    Title: {
      type: Sequelize.STRING,
      allowNull: false
    },
    Term: {
      type: Sequelize.CHAR,
      allowNull: false
    },
    Day: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    StartDate: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    EndDate: {
      type: Sequelize.DATEONLY,
      allowNull: false
    },
    StartTime: {
      type: Sequelize.TIME,
      allowNull: false
    },
    EndTime: {
      type: Sequelize.TIME,
      allowNull: false
    },
    Sections: {
      type: Sequelize.INTEGER
    },
    SecChar: {
      type: Sequelize.CHAR
    },
    DateBooked: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    },
    Purpose: {
      type: Sequelize.STRING
    }
  },
  {
    freezeTableName: true,
    timestamps: false
  }
)

module.exports = {
  getRecurring: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await RecurringReservationsModel.findAll({
          where: { ...args }
        })
        resolve(data)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  },
  createRecurring: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await RecurringReservationsModel.create(args)
        resolve(data)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  },
  updateRecurring: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await RecurringReservationsModel.update(args, {
          where: { BookingID: args.BookingID }
        })
        resolve(data)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  },
  deleteRecurring: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await RecurringReservationsModel.destroy(args, {
          where: { BookingID: args.BookingID }
        })
        resolve(data)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  }
}
