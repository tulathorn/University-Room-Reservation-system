require('dotenv').config()
const sgMail = require('@sendgrid/mail')
const ContactService = require('../service/ContactService')

sgMail.setApiKey(process.env.SGMAIL_SECRET)

module.exports = {
  find: async data => {
    let response = await ContactService.getContacts(data)
    return response
  },
  create: async data => {
    let response = await ContactService.createContact(data)
    return response
  },
  reply: async data => {
    const msg = {
      to: data.EmailAddress,
      from: 'reservationsystem.kmutt@gmail.com',
      dynamic_template_data: {
        subject: data.Title,
        text: data.Detail
      },
      template_id: 'd-366aaa2e10ee4769a41a64dac3e61ca5'
    }

    return sgMail
      .send(msg)
      .then(data => data)
      .catch(err => {
        console.log('Error on sendGrid', err)
        console.log(err.response.body)
        return err
      })
  },
  delete: async data => {
    return await ContactService.deleteContact(data)
  }
}
