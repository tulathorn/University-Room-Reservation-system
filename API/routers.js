const routerAuthen = require('./middleware/routerAuthen')

const UserController = require('./controller/UserController')
const RoomController = require('./controller/RoomController')
const RoomUseController = require('./controller/RoomUseController')
const ReservationController = require('./controller/ReservationController')
const RecurringController = require('./controller/RecurringController')
const ContactController = require('./controller/ContactController')
const EquipmentController = require('./controller/EquipmentController')
const SectionController = require('./controller/SectionController')

const Mainrouters = (fastify, opts, next) => {
  fastify.get('/', async (request, reply) => {
    await routerAuthen(request, reply)
    reply.type('application/json').code(200)
    reply.send({ messege: 'Welcome to RRS APi' })
  })

  // User Router
  fastify.get('/users', async (request, reply) => {
    await routerAuthen(request, reply)
    const data = await UserController.find(request.query)
    reply.type('application/json').code(200)
    reply.send(data)
  })
  fastify.post('/users', async (request, reply) => {
    await routerAuthen(request, reply)
    const data = await UserController.create(request.body)
    reply.type('application/json').code(200)
    reply.send(data)
  })
  fastify.put('/users', async (request, reply) => {
    await routerAuthen(request, reply)
    const data = await UserController.update(request.body)
    reply.type('application/json').code(200)
    reply.send(data)
  })
  fastify.delete('/users', async (request, reply) => {
    await routerAuthen(request, reply)
    const data = await UserController.delete(request.query)
    reply.type('application/json').code(200)
    reply.send(data)
  })

  // Room Router
  fastify.get('/rooms', async (request, reply) => {
    await routerAuthen(request, reply)
    const data = await RoomController.find(request.query)
    reply.type('application/json').code(200)
    reply.send(data)
  })

  fastify.post('/rooms', async (request, reply) => {
    await routerAuthen(request, reply)
    const data = await RoomController.create(request.body)
    reply.type('application/json').code(200)
    reply.send(data)
  })

  fastify.put('/rooms', async (request, reply) => {
    await routerAuthen(request, reply)
    const data = await RoomController.update(request.body)
    reply.type('application/json').code(200)
    reply.send(data)
  })

  fastify.delete('/rooms', async (request, reply) => {
    await routerAuthen(request, reply)
    const data = await RoomController.delete(request.query)
    reply.type('application/json').code(200)
    reply.send(data)
  })

  // Reservation Router
  fastify.get('/reservations', async (request, reply) => {
    await routerAuthen(request, reply)
    const data = await ReservationController.find(request.query)
    reply.type('application/json').code(200)
    reply.send(data)
  })

  fastify.post('/reservations', async (request, reply) => {
    await routerAuthen(request, reply)
    const data = await ReservationController.create(request.body)
    reply.type('application/json').code(200)
    reply.send(data)
  })

  fastify.put('/reservations', async (request, reply) => {
    await routerAuthen(request, reply)
    const data = await ReservationController.update(request.body)
    reply.type('application/json').code(200)
    reply.send(data)
  })

  fastify.delete('/reservations', async (request, reply) => {
    await routerAuthen(request, reply)
    const data = await ReservationController.delete(request.query)
    reply.type('application/json').code(200)
    reply.send(data)
  })

  // Find avaiable
  fastify.put('/reservations/avaiable', async (request, reply) => {
    await routerAuthen(request, reply)
    const data = await ReservationController.findAvaiable(request.body)
    reply.type('application/json').code(200)
    reply.send(data)
  })

  // RecurringReservations Router
  fastify.get('/recurring', async (request, reply) => {
    await routerAuthen(request, reply)
    reply.type('application/json').code(200)
    const data = await RecurringController.find(request.query)
    reply.send(data)
  })

  fastify.post('/recurring', async (request, reply) => {
    await routerAuthen(request, reply)
    reply.type('application/json').code(200)
    const data = await RecurringController.create(request.body)
    reply.send(data)
  })

  fastify.delete('/recurring', async (request, reply) => {
    await routerAuthen(request, reply)
    reply.type('application/json').code(200)
    const data = await RecurringController.delete(request.query)
    reply.send(data)
  })

  // RoomUse Router
  fastify.get('/pin/validate', async (req, rep) => {
    const data = await RoomUseController.find(req.query)
    rep.type('application/json').code(200)
    console.log(data)
    rep.send(data)
  })

  fastify.post('/pin', async (request, reply) => {
    await routerAuthen(request, reply)
    const data = await RoomUseController.createOnece(request.query)
    reply.type('application/json').code(200)
    reply.send(data)
  })

  fastify.put('/pin/status', async (request, reply) => {
    await routerAuthen(request, reply)
    const data = await RoomUseController.update(request.body)
    reply.type('application/json').code(200)
    reply.send(data)
  })

  // Contact router

  fastify.get('/contact', async (request, reply) => {
    await routerAuthen(request, reply)
    const data = await ContactController.find(request.query)
    reply.type('application/json').code(200)
    reply.send(data)
  })

  fastify.post('/contact', async (request, reply) => {
    await routerAuthen(request, reply)
    const data = await ContactController.create(request.body)
    reply.type('application/json').code(200)
    reply.send(data)
  })

  fastify.post('/contact/reply', async (request, reply) => {
    await routerAuthen(request, reply)
    const data = await ContactController.reply(request.body)
    reply.type('application/json').code(200)
    console.log(data[0].statusCode)
    reply.send(data[0].statusCode ? { msg: 'sucess' } : data)
  })

  fastify.delete('/contact', async (request, reply) => {
    await routerAuthen(request, reply)
    const data = await ContactController.delete(request.query)
    reply.type('application/json').code(200)
    reply.send(data)
  })

  fastify.get('/equipment', async (request, reply) => {
    await routerAuthen(request, reply)
    const data = await EquipmentController.find(request.query)
    reply.type('application/json').code(200)
    reply.send(data)
  })

  fastify.get('/section', async (request, reply) => {
    await routerAuthen(request, reply)
    const data = await SectionController.find(request.query)
    reply.type('application/json').code(200)
    reply.send(data)
  })

  next()
}
module.exports = Mainrouters
