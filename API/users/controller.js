const UserRepo = require('./repository')

module.exports = {
  find: async data => {
    let response = await UserRepo.getUser(data)
    return response
  },
  create: async data => {
    let response = await UserRepo.createUser(data)
    return response
  },
  update: async data => {
    let response = await UserRepo.updateUser(data)
    return response
  },
  delete: async data => {
    let response = await UserRepo.deleteUser(data)
    return response
  }
}
