const Bookshelf = require('../bookshelf')

const Reservation = Bookshelf.model('Reservation', {
  tableName: 'Reservations'
})

module.exports = Reservation
