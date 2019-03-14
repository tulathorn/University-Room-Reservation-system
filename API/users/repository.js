const User = require('./model')

// const Bookshelf = require('../bookshelf')

// const Reservation = require('../reservations/model')

// const User = Bookshelf.model('User', {
//   tableName: 'UserInfo',
//   reservations: function() {
//     return this.hasMany(Reservation, 'UserID', 'ID')
//   }
// })

module.exports = {
  _getUser: args => {
    return new Promise(async (resolve, reject) => {
      try {
        let condition = args || ''
        let data = await UserSchema.findAll({
          where: {
            ...condition
          }
        })
        resolve(data)
      } catch (err) {
        reject(err)
      }
    })
  },
  getUser: async args => {
    const users = User.where({ ...args })
      .fetchAll({ withRelated: ['reservations'] })
      .then(data => data)
      .catch(err => err)

    return users
  },
  createUser: args => {
    const users = User.forge({ ...args })
      .save()
      .then(data => data.toJSON())
      .catch(err => err)
    return users
  },
  updateUser: args => {
    const users = User.where('UserID', args.UserID)
      .save(args, { method: 'update' })
      .then(data => data.toJSON())
      .catch(err => err)
    return users
  },
  deleteUser: args => {
    const users = User.where('UserID', args.UserID)
      .destroy()
      .then(data => data)
      .catch(err => err)
    return users
  }
}
