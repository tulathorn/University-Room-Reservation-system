const UserService = require('../service/UserService')

module.exports = {
  find: async data => {
    let response = await UserService.getUser(data)
    return response
  },
  create: async data => {
    let response = await UserService.createUser(data)
    return response
  },
  update: async data => {
    let response = await UserService.updateUser(data)
    return response
  },
  delete: async data => {
    let response = await UserService.deleteUser(data)
    return response
  }
}
