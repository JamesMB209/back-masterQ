/** Imports */
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const knexFile = require('./knexfile.js');
const jwt = require('jsonwebtoken');
const knex = require('knex')(knexFile[process.env.ENVIROMENT]);
const authClass = require("./auth")();
const PatientAuthRouter = require('./router/authRouter.js')
const axios = require('axios')
const config = require('./config')

const patientAuthRouter = new PatientAuthRouter(express, axios, jwt, knex, config)

// const Doctor = require("./service/doctorService");
// const Patient = require("./service/patientService");
// const History = require("./service/historyService");
// const Business = require("./service/businessService");
// const QueObject = require("./service/serverService");
// const Pharmacy = require("./service/pharmacyService");

/** App configuration */
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(authClass.initialize());///

const http = require("http").createServer(app);
const io = require("socket.io")(http);

/** Router */
app.use('/', patientAuthRouter.router())


// app.get('/', (req, res) => {
//     res.send('Welcome to CORS server 😁')
// })

/** create server */
// const server = new QueObject();

// io.on("connection", (socket) => {
// console.log("New client connected");
//     socket.on("start", (data) => {
//         console.log(data);
//         let doctor = doctors[data - 1];

//         socket.join(doctor.room);
//         console.log(`A user has connected to room ${doctor.fullName}`);
//     });
// socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//   });
// });

// let interval;

// io.on("connection", (socket) => {
//   console.log("New client connected");
//   if (interval) {
//     clearInterval(interval);
//   }
//   interval = setInterval(() => getApiAndEmit(socket), 1000);
//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//     clearInterval(interval);
//   });
// });

// const getApiAndEmit = socket => {
//   const response = new Date();
//   // Emitting a new message. Will be consumed by the client
//   socket.emit("FromAPI", response);
// };

































/** status info */
// setTimeout(() => {
//     let businessID = 9;
//     let doctorID = 4;
//     console.log(server);
//     // console.log(server[businessID][doctorID])


//     server.reload({id: 9})
// }, 1000)

// setTimeout(() => {
//     let businessID = 9;
//     let doctorID = 4;
//     console.log(server);

// }, 3000)

/** App init */
http.listen(process.env.PORT);
// app.listen(process.env.PORT);
console.log(`Backend running on port: ${process.env.PORT} using the ${process.env.ENVIROMENT} enviroment`);