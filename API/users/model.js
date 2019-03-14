const Bookshelf = require('../bookshelf')

// const Reservation = require('../reservations/model')

const Reservation = Bookshelf.model('Reservation', {
  tableName: 'Reservations'
})

const User = Bookshelf.model('User', {
  tableName: 'UserInfo',
  reservations: function() {
    return this.hasMany(Reservation, 'UserID', 'UserID')
  }
})

module.exports = User
