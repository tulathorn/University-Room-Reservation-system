const swaggerJSDoc = require("swagger-jsdoc");

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
  next();
};
module.exports = Mainrouters;
