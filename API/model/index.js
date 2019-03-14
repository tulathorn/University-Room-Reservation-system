const Bookshelf = require('../bookshelf')

const User = Bookshelf.model('User', {
  tableName: 'UserInfo',
  reservations: function() {
    return this.hasMany(Reservation, 'UserID', 'UserID')
  }
})

const Reservation = Bookshelf.model('Reservation', {
  tableName: 'Reservations',
  userInfo: function() {
    return this.belongsTo(User, 'UserID', 'UserID')
  }
})

module.exports = { User, Reservation }
