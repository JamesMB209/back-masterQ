/** Imports */
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const knexFile = require('./knexfile.js');
const knex = require('knex')(knexFile[process.env.ENVIROMENT]);
const jwt = require('jsonwebtoken');
const authClass = require("./auth")();
const axios = require('axios')
const config = require('./config')

const Doctor = require("./service/doctorService");
const NewPatient = require("./service/newPatientService");
const History = require("./service/historyService");
const Business = require("./service/businessService");
const Queue = require("./service/queueService");
const Pharmacy = require("./service/pharmacyService");
const AuthRouter = require('./router/authRouter.js')
const authRouter = new AuthRouter(express, axios, jwt, knex, config)
const ApiRouter = require("./router/apiRouter");
const apiRouter = new ApiRouter(express, jwt, knex, authClass);

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
app.use('/', authRouter.router())
app.use("/api", apiRouter.router())



/** Socket Logic - to abstract later - you know or maybe not */
io.use(function (socket, next) {
    if (socket.handshake.query && socket.handshake.query.token) {
        jwt.verify(socket.handshake.query.token, config.jwtSecret, function (err, decoded) {
            if (err) return next(new Error('Authentication error'));
            socket.decoded = decoded;
            next();
        });
    }
    else {
        next(new Error('Authentication error')); // could crash the server..?
    }
}).on("connection", (socket) => {
    console.log("CONNECTED");
    socket.on("JOIN_ROOM", (data) => { //working
        //setup what is required.
        let doctor = server[data.business][data.doctor];

        //do stuff
        socket.join(doctor.id);
        io.to(doctor.id).emit("UPDATE_PATIENT")
    });

    socket.on("GET_QUEUE_POSTITION", (data) => { //working
        //setup what is required.
        let doctor = server[data.business][data.doctor];
        let patientID = socket.decoded.id

        //do stuff
        doctor.patient(patientID).then((patient) => {
            io.to(doctor.id).emit(socket.handshake.query.token, patient.queuePosition)
        }).catch((err) => {
            io.to(doctor.id).emit(socket.handshake.query.token, err)
        })
    });

    socket.on("NEXT", (data) => {  //working but have not completed history
        let business = server[data.business];
        let doctor = server[data.business][data.doctor];

        //logic for what happens on a doctor pressing "next".
        // console.log("LINE 84 DOCTORS QUEUE", doctor.queue)
        //update the appointment history.
        // history.saveDiagnosis(doctor.id, doctor.queue[0], data.diagnosis);
        // history.saveBooking(doctor.queue[0], true);
        //advance the doctors queue.
        business.pharmacy.addToQueue(doctor.next());

        // updatePatient(data.business, data.doctor)
        io.to(doctor.id).emit("UPDATE_PATIENT")
        console.log(doctor)
    });

    // socket.on("newPatient", async (data) => {
    //     console.log(`3 NEW PATIENT`);
    //     updatePatient (data.business, data.doctor)

    //     // const doctor = server[data.business][data.doctor];
    //     // doctor.patient(patientID).then((patient) => {
    //     //     io.to(doctor.id).emit("updatePatient", patient.queuePosition)
    //     // }).catch((err) => {
    //     //     io.to(doctor.id).emit("updatePatient", err)
    //     // })

    //     // io.to(doctor.id).emit("updateDoctor");
    //     // socket.emit("updateMain");
    // });
    ///////////////// THIS PART IS FOR BUSINESSES ONLY!(MAYBE) --
    
    socket.on("UPDATE_DOCTOR", (data) => {
        let business = server[data.business];
        let doctor = server[data.business][data.doctor];
        // let doctor = doctors[data - 1];
        // io.to(doctor.id).emit("updateDoctor");
        // io.emit("refreshThat")
        socket.emit(socket.handshake.query.token, doctor);
    });

    socket.on("moveUp", (data) => {
        let doctor = doctors[data.doctor - 1];

        doctor.move(`${data.hkid}`);
        io.to(doctor.id).emit("updatePatient");
        io.emit("updateMain");
    });

    socket.on("removeQ", (data => {
        let doctor = doctors[data.doctor - 1];

        //update the appointment history database.
        doctor.patient(data.hkid)
            .then((patient) => {
                history.saveBooking(patient, false);
            })
            .catch(err => console.log(err));

        //remove from the doctors queue.
        doctor.remove(data.hkid);

        io.to(doctor.id).emit("updatePatient")
        socket.emit("updateMain")
        io.emit("updateDoctor");
    }))

    socket.on("refreshThat", () => {
        io.emit("updateMain");
    });

    socket.on("disconnect", () => {
        console.log("DISCONNECT")
    })
});









/** status info */
setTimeout(() => {
    //Testing code inside here
    let businessID = 1;
    let doctorID = 2;
    let patientID = 1;
    server[businessID][doctorID].addToQueue(new NewPatient(patientID));
    server[businessID][doctorID].addToQueue(new NewPatient(patientID));
    patientID = 2;
    server[businessID][doctorID].addToQueue(new NewPatient(patientID));
    patientID = 3;
    server[businessID][doctorID].addToQueue(new NewPatient(patientID));

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