const Mainrouters = (fastify, opts, next) => {
  // Test route
  fastify.get("/", async (request, reply) => {
    reply.type("application/json").code(200);
    reply.send({ messege: "Welcome to RRS APi" });
  });
  next();
};
module.exports = Mainrouters;
