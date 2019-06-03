const { Contact } = require('../model')

module.exports = {
  getContacts: async args => {
    console.log('Contact Call =>', args)
    const result = await Contact.where({ ...args })
      .fetchAll()
      .then(data => data.toJSON())
      .catch(err => err)

    return result
  },
  createContact: async args => {
    const res = await Contact.forge({ ...args })
      .save()
      .then(data => data.toJSON())
      .catch(err => err)

    return res
  },
  deleteContact: async args => {
    const result = await Contact.where('ContactID', args.ContactID)
      .destroy()
      .then(data => data.toJSON())
      .catch(err => err)

    return result
  }
}
