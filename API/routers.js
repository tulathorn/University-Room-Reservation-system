const swaggerJSDoc = require('swagger-jsdoc')

// controller call
const userController = require('./users/controller')
const roomController = require('./rooms/controller')
const reservationController = require('./reservations/controller')

const Mainrouters = (fastify, opts, next) => {
  fastify.get('/', async (request, reply) => {
    reply.type('application/json').code(200)
    reply.send({ messege: 'Welcome to RRS APi' })
  })

  fastify.get('/users', async (request, reply) => {
    console.log(request.query)
    const data = await userController.find(request.query)
    reply.type('application/json').code(200)
    reply.send(data)
  })
  fastify.post('/users', async (request, reply) => {
    // console.log(request.body);
    const data = await userController.create(request.body)
    reply.type('application/json').code(200)
    reply.send(data)
  })
  fastify.put('/users', async (request, reply) => {
    // console.log(request);
    const data = await userController.update(request.body)
    reply.type('application/json').code(200)
    reply.send(data)
  })
  fastify.delete('/users', async (request, reply) => {
    console.log(request.query)
    const data = await userController.delete(request.query)
    reply.type('application/json').code(200)
    reply.send(data)
  })

  fastify.get('/rooms', async (request, reply) => {
    console.log(request.query)
    const data = await roomController.find(request.query)
    reply.type('application/json').code(200)
    reply.send(data)
  })

  fastify.post('/rooms', async (request, reply) => {
    console.log(request.query)
    const data = await roomController.create(request.body)
    reply.type('application/json').code(200)
    reply.send(data)
  })

  fastify.put('/rooms', async (request, reply) => {
    console.log(request.query)
    const data = await roomController.update(request.body)
    reply.type('application/json').code(200)
    reply.send(data)
  })

  fastify.delete('/rooms', async (request, reply) => {
    console.log(request.query)
    const data = await roomController.delete(request.query)
    reply.type('application/json').code(200)
    reply.send(data)
  })

  fastify.get('/reservations', async (request, reply) => {
    console.log(request.query)
    const data = await reservationController.find(request.query)
    reply.type('application/json').code(200)
    reply.send(data)
  })

  fastify.post('/reservations', async (request, reply) => {
    const data = await reservationController.create(request.body)
    reply.type('application/json').code(200)
    reply.send(data)
  })

  fastify.put('/reservations', async (request, reply) => {
    const data = await reservationController.update(request.body)
    reply.type('application/json').code(200)
    reply.send(data)
  })

  next()
}
module.exports = Mainrouters
