const { User } = require('../model')

module.exports = {
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
