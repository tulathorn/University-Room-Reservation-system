const fastify = require("fastify")();

// Health check the api
fastify.get("/healthcheck", async (request, reply) => {
  reply.code(200);
  reply.send("Up");
});

// roters register
fastify.register(require("./routers"), {
  logLevel: "warn"
});

fastify.listen(4000, err => {
  if (err) {
    console.log(err);
  }
  console.log(`server listening on ${fastify.server.address().port}`);
});
