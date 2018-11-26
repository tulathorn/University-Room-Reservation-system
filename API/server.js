const fastify = require("fastify")();
const swaggerJSDoc = require("swagger-jsdoc");

// Doc
const swaggerDefinition = {
  info: {
    title: "Node Swagger API",
    version: "1.0.0",
    description: "Demonstrating how to describe a RESTful API with Swagger"
  },
  host: "localhost:4000",
  basePath: "/"
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ["./routes/.js", "routes.js"] // pass all in array
};
// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// Init swagger route
fastify.get("/swagger.json", async (request, reply) => {
  reply.code(200);
  reply.header("Content-Type", "application/json");
  reply.send(swaggerSpec);
});

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
