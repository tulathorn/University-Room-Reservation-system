const Sequelize = require('sequelize')

const sequelize = new Sequelize('RoomReservationSystem', 'root', 'example', {
  host: 'localhost',
  dialect: 'mysql',
  timezone: 'Asia/Bangkok',
  dialectOptions: {
    port: 3306,
    database: 'RoomReservationSystem',
    useUTC: false, // for reading from database
    dateStrings: true,
    typeCast(field, next) {
      // for reading from database
      if (field.type === 'DATETIME') {
        return field.string()
      }
      return next()
    }
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})

module.exports = sequelize
