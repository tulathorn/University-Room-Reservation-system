const Bookshelf = require('../bookshelf')

const Reservation = require('../reservations/model')

const User = Bookshelf.model('User', {
  tableName: 'UserInfo',
  reservations: function() {
    return this.hasMany(Reservation, 'UserID', 'ID')
  }
})

module.exports = User
