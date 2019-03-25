const knex = require('knex')

module.exports = knex({
  client: 'mysql',
  connection: {
    host: 'localhost',
    database: 'RoomReservationSystem',
    user: 'root',
    password: 'example'
  }
})
