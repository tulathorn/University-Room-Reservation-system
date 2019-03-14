const Bookshelf = require('../bookshelf')

const User = Bookshelf.model('User', {
  tableName: 'UserInfo',
  reservations: function() {
    return this.hasMany(Reservation, 'UserID', 'UserID')
  }
})

const Reservation = Bookshelf.model('Reservation', {
  tableName: 'Reservations',
  UserInfo: function() {
    return this.belongsTo(User, 'UserID', 'UserID')
  },
  RoomInformation: function() {
    return this.belongsTo(Room, 'RoomID', 'RoomID')
  },
  RoomUse: function() {
    return this.belongsTo(RoomUse, 'BookingID', 'BookingID')
  }
})

const RecurringReservations = Bookshelf.model('RecurringReservations', {
  tableName: 'RecurringReservations',
  Section: function() {
    return this.belongsTo(Section, 'Sections', 'ID')
  },
  RoomUse: function() {
    return this.belongsTo(RoomUse, 'BookingID', 'BookingID')
  },
  Reservation: function() {
    return this.belongsTo(Reservation, 'BookingID', 'RID')
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

const RoomUse = Bookshelf.model('RoomUse', {
  tableName: 'RoomUse'
})

const Section = Bookshelf.model('Section', {
  tableName: 'Section',
  RecurringReservation: function() {
    return this.hasMany(RecurringReservations, 'ID', 'Sections')
  }
})

module.exports = { User, Reservation, Room, RoomUse, Equipment }
