const Bookshelf = require('../bookshelf')

const User = require('../users/model')

const Reservation = Bookshelf.model('Reservation', {
  tableName: 'Reservations',
  UserInfo: function() {
    return this.belongsToMany(User, 'UserID', 'ID')
  }
})

module.exports = Reservation
