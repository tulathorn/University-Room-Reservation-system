const ContractModel = require('./model')

module.exports = {
  find: async data => {
    let response = await ContractModel.getContacts(data)
    return response
  },
  create: async data => {
    let response = await ContractModel.createContact(data)
    return response
  },
  update: async data => {
    let response = await ContractModel.updateContact(data)
    return response
  },
  delete: async data => {
    let response = await ContractModel.deleteContact(data)
    return response
  }
}
