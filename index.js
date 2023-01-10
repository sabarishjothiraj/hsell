const express = require("express");
const app = express();
const cors = require("cors");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
require("dotenv").config();
const route = require("./route");
const commonFunction = require("./common/common_function");
const errorHandler = require("./controller/error-handler");

const corsOptions = {
  origin: "*",
  Credentials: true,
  optionsSuccessStatus: 200,
};

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Hsell API Docs",
      version: "1.0.0",
      description: "customer and seller apis",
      contact: { name: "sabarees" },
    },
    servers: [
      {
        url: "http://43.205.65.0:3000",
        // url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./router/*.js", "route.js"],
};

app.use(cors(corsOptions));
app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use("/api", commonFunction.JwtVerification, route);

const apiSpecs = swaggerJSDoc(swaggerOptions);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(apiSpecs));

commonFunction.connectDatabase();
app.request.mailer = commonFunction.connectMailService();

app.get("/api/hsell", (req, res) => {
  res.status(200).send("hsell ready to Start");
});

app.use(errorHandler.errHandler);
app.use(errorHandler.notFound);

app.listen(process.env.PORT, (err) => {
  if (err) console.log(`Server connection issue: ${err}`);
  else console.log("Server connected " + process.env.PORT);
});
