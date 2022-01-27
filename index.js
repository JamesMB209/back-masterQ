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


const Doctor = require("./service/doctorService");
const Patient = require("./service/patientService");
const NewPatient = require("./service/newPatientService");
const History = require("./service/historyService");
const Business = require("./service/businessService");
const Queue = require("./service/queueService");
const Pharmacy = require("./service/pharmacyService");

/** App configuration */
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(authClass.initialize());///

const http = require("http").createServer(app);
const io = require("socket.io")(http);

/** create server */
const server = new Queue();

/** Router */
const patientAuthRouter = new PatientAuthRouter(express, axios, jwt, knex, config, server)
app.use('/', patientAuthRouter.router())

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
// async function searchysearchy() {
//     try {
//         let business = await knex('business_users')
//             .select('id', 'name')
//         let doctors = await knex('doctors')
//         .select('business_id','id','f_name','l_name')

//     } catch (err) {
//         console.error(err)
//     }
// }
// searchysearchy();

/** status info */
setTimeout(() => {
    //Testing code inside here
    let businessID = 3;
    let doctorID = 4;
    let patientID = 1;

    // server[businessID][doctorID].addToQueue(new NewPatient(patientID));

    //    console.log(Object.keys(server).forEach(key => console.log(Object.keys(server[key]))))
}, 1000)

setTimeout(() => {
    //Result of your testing code.
    // let businessID = 3;
    // let doctorID = 4;
    // let patientID = 1;
    // console.log(server);
    // // console.log(server[businessID])
    // console.log(server[businessID][doctorID])
    // console.log(server[businessID][doctorID].patient(patientID).then((patient) => {console.log(patient)}));

}, 2000)

/** App init */
http.listen(process.env.PORT);
// app.listen(process.env.PORT);
console.log(`Backend running on port: ${process.env.PORT} using the ${process.env.ENVIROMENT} enviroment`);
















//saved notes
// setTimeout(() => {
//     axios
//         .get("https://randomuser.me/api/?results=3")
//         .then((response) => {
//             for (i of response.data.results) {
//                 // let docID = Math.floor(Math.random() * doctors.length);
//                 let hkid = `${i.location.postcode}`.split(' ').join('');

//                 let businessID = 3;
//                 let doctorID = 4;

//                 server[businessID][doctorID].addToQueue(new Patient({
//                     fName: i.name.first,
//                     lName: i.name.last,
//                     temperature: Math.floor(Math.random() * 3) + 36,
//                     hkid: hkid,
//                     dob: i.dob.date,
//                     gender: i.gender,
//                     doctor: doctorID,
//                 }));

//                 // console.log(`${i.name.first} ${i.name.last}:http://localhost:8000/queue/${docID + 1}/${hkid}`)

//             }
//         })
// }, 0);