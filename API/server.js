require('dotenv').config()
const fastify = require('fastify')()
const knex = require('./knex')
const fs = require('fs')
const path = require('path')
const fastifyCors = require('fastify-cors')

fastify.register(fastifyCors, {})

fastify.register(require('fastify-jwt'), {
  secret: process.env.API_SECRET
  // verify: {
  //   maxAge: '10h'
  // }
})

// Health check the api
fastify.get('/healthcheck', async (request, reply) => {
  reply.code(200)
  reply.send('Up')
})

// roters register
fastify.register(require('./middleware/auth'), {
  logLevel: 'warn'
})

fastify.register(require('./routers'), {
  logLevel: 'warn'
})

// fastify.register()

fastify.listen(4000, '0.0.0.0', err => {
  if (err) {
    console.log(err)
  }
  knex
    .raw('select 1+1 as result')
    .then(function(data) {
      console.log('Sucessful connect to database')
    })
    .catch(err => {
      console.log('DB error', err)
    })
  // console.log(process.env)
  console.log(`Server listening on ${fastify.server.address().port}`)
})
