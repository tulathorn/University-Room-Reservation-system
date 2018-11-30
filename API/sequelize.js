const Sequelize = require("sequelize");

const sequelize = new Sequelize("RoomReservationSystem", "root", "example", {
  host: "localhost",
  dialect: "mysql",
  dialectOptions: {
    port: 3306,
    database: "RoomReservationSystem"
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

module.exports = sequelize;
