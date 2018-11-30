const fastify = require("fastify")();
const sequelize = require("./sequelize");
const fs = require("fs");
const path = require("path");
// const SwaggerUI = require("swagger-ui-dist");

// const serveSwaggerSpec = require("./specProvider");
// const pathToSwaggerUi = SwaggerUI.absolutePath();
// const SPEC_PATH = "spce.json";

// // Replace default swagger URL if needed
// const swaggerIndex = fs
//   .readFileSync(`${pathToSwaggerUi}/index.html`)
//   .toString()
//   .replace(
//     "https://petstore.swagger.io/v2/swagger.json",
//     "http://localhost:" + "4000" + SPEC_PATH
//   );

// fs.writeFile(`${pathToSwaggerUi}/index.html`, swaggerIndex, err => {
//   if (err) {
//     console.log(err);
//   }
// });

// // for swagger register
// fastify.register(require("fastify-static"), {
//   root: path.join(SPEC_PATH, {...serveSwaggerSpec}),
//   // prefix: serveSwaggerSpec // optional: default '/'
// });

// fastify.get(`${pathToSwaggerUi}`, function(req, reply) {
//   reply.sendFile("index.html"); // serving path.join(__dirname, 'public', 'myHtml.html') directly
// });

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
  sequelize
    .authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch(err => {
      console.error("Unable to connect to the database:", err);
    });
  console.log(`server listening on ${fastify.server.address().port}`);
});
