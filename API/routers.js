const swaggerJSDoc = require("swagger-jsdoc");

// controller call
const userController = require("./users/controller");

const Mainrouters = (fastify, opts, next) => {
  /**
   * @swagger
   * /:
   *   get:
   *     tags:
   *       - root
   *     description: Root of API
   *     produces:
   *       - application/json
   *     responses:
   *       200:
   *         description: An array of users
   *
   */
  fastify.get("/", async (request, reply) => {
    reply.type("application/json").code(200);
    reply.send({ messege: "Welcome to RRS APi" });
  });

  fastify.get("/users", async (request, reply) => {
    console.log(request.query);
    const data = await userController.find(request.query);
    reply.type("application/json").code(200);
    reply.send(data);
  });
  fastify.post("/users", async (request, reply) => {
    // console.log(request.body);
    const data = await userController.create(request.body);
    reply.type("application/json").code(200);
    reply.send(data);
  });
  fastify.put("/users", async (request, reply) => {
    console.log(request);
    const data = await userController.update();
    reply.type("application/json").code(200);
    reply.send(data);
  });
  fastify.delete("/users", async (request, reply) => {
    console.log(request);
    const data = await userController.delete();
    reply.type("application/json").code(200);
    reply.send(data);
  });

  next();
};
module.exports = Mainrouters;
