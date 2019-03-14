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

const Equipment = Bookshelf.model('Equipment', {
  tableName: 'Equipment'
})

const Room = Bookshelf.model('Room', {
  tableName: 'RoomInformation',
  Equipment: function() {
    return this.belongsTo(Equipment, 'RoomID', 'RoomID')
  }
})

module.exports = { User, Reservation, Room, Equipment }
