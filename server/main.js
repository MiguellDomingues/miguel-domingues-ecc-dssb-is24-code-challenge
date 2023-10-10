var express = require("express"),
bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");
const cors = require('cors');

const app = express();
const port = 3000;

app.use(express.json());
app.use( cors() ); 

//app.use("/books", require("./routes/books"));

app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  );
app.use(bodyParser.json());

///api/product

app.use("/api/product", require("./routes/product"));

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API documentation for /product using Swagger",
      version: "0.1.0",
      description:"Demo of integrating SwaggerUI with my react application",
      license: {
        name: "MIT",
        url: "https://spdx.org/licenses/MIT.html",
      },
      contact: {
        name: "Miguel Domingues",
        url: "https://miguelldomingues.github.io/",
        email: "mdomingues1001@.gmail.com",
      },
    },
    servers: [
      {
        url: "http://localhost:3000/api/product",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    explorer: true,
    customCssUrl:
      "https://cdn.jsdelivr.net/npm/swagger-ui-themes@3.0.0/themes/3.x/theme-newspaper.css",
  })
);

















// A DB.js FILE.  add a thin layer of adstraction
//between data processing and endpoints
//endpoints should be for param checking

// ie: name: "", name: "  ", name: null, (name not on obj at all)
//google 'sanitize rest inputs'


app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})