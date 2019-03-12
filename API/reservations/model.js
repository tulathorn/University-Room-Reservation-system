const Bookshelf = require('../bookshelf')

const Reservation = Bookshelf.model('Reservation', {
  tableName: 'Reservations',
  UserInfo: function() {
    return this.belongsToMany(User, 'UserID', 'UserID')
  },
  RoomInformation: function() {
    return this.belongsTo(Room, 'RoomID', 'RoomID')
  }
})

const User = Bookshelf.model('User', {
  tableName: 'UserInfo'
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

module.exports = {
  getAllReservations: args => {
    return new Promise(async (resolve, reject) => {
      try {
        const Reservations = Reservation.where({ ...args }).fetchAll({
          withRelated: ['User', 'Room']
        })
        resolve(Reservations)
      } catch (err) {
        console.log(err)
        reject(err)
      }
    })
  },
  createReservation: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await ReservationsSchema.create(args)
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  },
  updateReservation: args => {
    return new Promise(async (resolve, reject) => {
      try {
        console.log(args)
        let data = await ReservationsSchema.update(args, {
          where: { BookingID: args.BookingID }
        })
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  },
  deleteReservation: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let data = await ReservationsSchema.destroy({
          where: { BookingID: args.BookingID }
        })
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  }
}
