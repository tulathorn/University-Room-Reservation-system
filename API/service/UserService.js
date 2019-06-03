const { User } = require('../model')

module.exports = {
  getUser: async args => {
    const users = User.where({ ...args })
      .fetchAll({ withRelated: ['reservations'] })
      .then(data => data.toJSON())
      .catch(err => err)

    return users
  },
  createUser: async args => {
    const users = await User.forge({ ...args })
      .save()
      .then(data => data.toJSON())
      .catch(err => err)
    return users
  },
  updateUser: async args => {
    const users = await User.where('UserID', args.UserID)
      .save(args, { method: 'update' })
      .then(data => data.toJSON())
      .catch(err => err)
    return users
  },
  deleteUser: async args => {
    const users = await User.where('UserID', args.UserID)
      .destroy()
      .then(data => data.toJSON())
      .catch(err => err)
    return users
  }
}
