const routeAuthentication = async (request, reply) => {
  request.jwtVerify(function(err, decoded) {
    if (err) {
      reply.code(403)
      return reply.send(err)
    }
  })
}

module.exports = routeAuthentication
