/** Imports */
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const knexFile = require('./knexfile.js');
const jwt = require('jsonwebtoken');
const knex = require('knex')(knexFile[process.env.ENVIROMENT]);
const authClass = require("./auth")();

const Doctor = require("./service/doctorService");
const Patient = require("./service/patientService");
const History = require("./service/historyService");
const Business = require("./service/businessService");
const Server = require("./service/serverService");
const Pharmacy = require("./service/pharmacyService");

/** App configuration */
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(authClass.initialize());///
/** Router */

// app.use("/api", apiRouter.router());

/** create server */
const server = new Server();

io.on("connection", (socket) => {
    socket.on("start", (data) => {
        console.log(data);
        let doctor = doctors[data - 1];

        socket.join(doctor.room);
        console.log(`A user has connected to room ${doctor.fullName}`);
    });
});


/** status info */
setTimeout(() => {
    let businessID = 9;
    let doctorID = 4;
    console.log(server);
    // console.log(server[businessID][doctorID])


    server.reload({id: 9})
}, 1000)

setTimeout(() => {
    let businessID = 9;
    let doctorID = 4;
    console.log(server);

}, 3000)

/** App init */
// app.listen(process.env.PORT)
http.listen(process.env.PORT);
console.log(`Backend running on port: ${process.env.PORT} using the ${process.env.ENVIROMENT} enviroment`);