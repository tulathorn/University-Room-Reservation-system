const ContactService = require('../service/ContactService')

module.exports = {
  find: async data => {
    let response = await ContactService.getContacts(data)
    return response
  },
  create: async data => {
    let response = await ContactService.createContact(data)
    return response
  },
  update: async data => {
    let response = await ContactService.updateContact(data)
    return response
  },
  delete: async data => {
    let response = await ContactService.deleteContact(data)
    return response
  }
}
