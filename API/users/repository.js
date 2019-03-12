const User = require('./model')

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
      .then(data => data.toJSON())
      .catch(err => err.toJSON())

    return users
  },
  createUser: args => {
    const users = User.forge({ ...args })
      .save()
      .then(data => data.toJSON())
      .catch(err => err.toJSON())
    return users
  },
  updateUser: args => {
    const users = User.where('ID', args.ID)
      .save(args, { method: 'update' })
      .then(data => data.toJSON())
      .catch(err => err)
    return users
  },
  deleteUser: args => {
    const users = User.where('ID', args.ID)
      .destroy()
      .then(data => data)
      .catch(err => err)
    return users
  }
}
