const fastify = require('fastify')()
const sequelize = require('./sequelize')
const fs = require('fs')
const path = require('path')
const fastifyCors = require('fastify-cors')

// Health check the api
fastify.get('/healthcheck', async (request, reply) => {
  reply.code(200)
  reply.send('Up')
})

// roters register
fastify.register(require('./routers'), {
  logLevel: 'warn'
})

fastify.register(fastifyCors, {})

fastify.listen(4000, err => {
  if (err) {
    console.log(err)
  }
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.')
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err)
    })
  console.log(`server listening on ${fastify.server.address().port}`)
})
