/** Imports */
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const knexFile = require('./knexfile.js');
const jwt= require('jsonwebtoken');
const knex = require('knex')(knexFile[process.env.ENVIROMENT]);
const DatabaseService = require("./service/databaseService");
const ApiRouter = require("./router/apiRouter");
const database = new DatabaseService(knex);
const authClass = require("./auth")();
const apiRouter = new ApiRouter(express, database, authClass);

const Doctor = require("./service/doctorService");
const Patient = require("./service/patientService");
const History = require("./service/historyService");
const Business = require("./service/businessService");
const Server = require("./service/serverService");
const Pharmacy = require("./service/pharmacyService");

/** App configuration */
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(authClass.initialize());///
/** Router */

// app.use("/api", apiRouter.router());

/** App init */
app.listen(process.env.PORT)
console.log(`Backend running on port: ${process.env.PORT} using the ${process.env.ENVIROMENT} enviroment`);