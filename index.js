/** Imports from  NPM*/
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const knexFile = require("./knexfile.js");
const knex = require("knex")(knexFile[process.env.ENVIROMENT]);
const jwt = require("jsonwebtoken");
const authClass = require("./auth")();
const axios = require("axios");
const config = require("./config");

/** Imports from local code */
const Doctor = require("./service/doctorService");
const History = require("./service/historyService");
const Pharmacy = require("./service/pharmacyService");
const Business = require("./service/businessService");
const NewPatient = require("./service/newPatientService");
const Queue = require("./service/queueService");
const AuthRouter = require("./router/authRouter.js");
const ApiRouter = require("./router/apiRouter");
const ObjRouter = require("./router/objRouter.js");
const SettingsRouter = require("./router/settingsRouter");
const ReviewRouter = require('./router/reviewRouter');

/** App configuration */
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(authClass.initialize());

const http = require("http").createServer(app);
const io = require("socket.io")(http);

/** App init */
http.listen(process.env.PORT);
console.log(
  `Backend running on port: ${process.env.PORT} using the ${process.env.ENVIROMENT} enviroment`
);

/** create server/classes */
const server = new Queue();
const history = new History();

/** Init routers */
const authRouter = new AuthRouter(express, axios, jwt, knex, config);
const apiRouter = new ApiRouter(express, jwt, knex, authClass);
const objRouter = new ObjRouter(express, axios, jwt, knex, authClass, server);
const settingsRouter = new SettingsRouter(express, jwt, knex, authClass, server);
/** Router */
app.use("/", authRouter.router());
app.use("/api", apiRouter.router());
app.use("/obj", objRouter.router());
app.use('/review', reviewRouter.router());
app.use("/setting", settingsRouter.router())


/** Socket Logic - to abstract later - you know or maybe not */
io
    .use(function (socket, next) {
        if (socket.handshake.query && socket.handshake.query.token) {
            jwt.verify(socket.handshake.query.token, config.jwtSecret, function (err, decoded) {
                if (err) return next(new Error('Authentication error'));
                socket.decoded = decoded;
                next();
            });
        }
        else {
            next(new Error('Authentication error'));
        }
    })
    .on("connection", (socket) => {
        console.log(`CONNECTED: socket user - ${socket.decoded.id}`);

        const loadDataPatient = (data) => {
            let business = server[data.business];
            let doctor = server[data.business][data.doctor];
            let patientID = socket.decoded.id;
            return [business, doctor, patientID]
        }

        const loadDataBusiness = (data) => {
            let business = server[socket.decoded.id];
            let doctor = server[socket.decoded.id][data.doctor];
            return [business, doctor]
        }

        const emitUpdate = (businessID, doctorID) => {
            let room = `${businessID}:${doctorID}`
            let business = `Business:${businessID}`

            socket.join(room);
            io.to(room).emit("UPDATE_PATIENT");
            socket.emit("UPDATE_BUSINESS");
        }

        socket.on("CHECKIN", (data) => {
            if (data.business == null || data.doctor == null) { console.log(`Invalid data`); return }
            let [business, doctor, patientID] = loadDataPatient(data);

            let patient = new NewPatient(patientID);

            /** History actions */
            // history.saveAppointmentHistoryCheckin(business, doctor, patient);

            /** Queue actions */
            doctor.addToQueue(patient);

            /** Update actions */
            emitUpdate(business.id, doctor.id)
        })

        socket.on("NEXT", (data) => {  //working but have not completed history
            console.log("NEXT")
            //for testing with the patient app
            // if (data.business == null || data.doctor == null) { console.log(`Invalid data`); return }
            // let [business, doctor, patientID] = loadDataPatient(data);
            //for production with the business app
            if (data.doctor == null) { console.log(`Invalid data`); return }
            let [business, doctor] = loadDataBusiness(data);

            /** Queue actions */
            let patient = doctor.next();

            if (doctor.id !== "pharmacy" && patient !== undefined) {
                console.log(data)
                /** Logic for a patient departing a doctors queue */
                /** History actions */
                // history.saveAppointmentHistoryDoctor(business, doctor, patient);

                /** move the patient to the pharmacy queue */
                business.pharmacy.addToQueue(patient)

            } else {
                console.log(data)
                /** Logic for a patient departing the pharmacy queue */
                /** History actions */
                // history.saveAppointmentHistoryPharmacy(business, doctor, patient);
            }

            /** Update actions */
            emitUpdate(business.id, doctor.id)
        });

        socket.on("disconnect", () => {
            console.log(`DISCONECTED: socket user - ${socket.decoded.id}`);
        })


        ///////////////// UNFINISHED ///////////////////// --

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

    });


/** status info */
setTimeout(() => {
  // //Testing code inside here
  let businessID = 1;
  let doctorID = 1;
  let patientID = 1;
  // server[businessID][doctorID].addToQueue(new NewPatient(patientID));
  server[businessID][doctorID].addToQueue(new NewPatient(patientID));
  patientID = 2;
  server[businessID][doctorID].addToQueue(new NewPatient(patientID));
  patientID = 3;
  server[businessID][doctorID].addToQueue(new NewPatient(patientID));

  //    console.log(Object.keys(server).forEach(key => console.log(Object.keys(server[key]))))
}, 1000);
/** status info */
setTimeout(() => {
  // //Testing code inside here
  let businessID = 1;
  let doctorID = 2;
  let patientID = 4;
  // server[businessID][doctorID].addToQueue(new NewPatient(patientID));
  server[businessID][doctorID].addToQueue(new NewPatient(patientID));
  patientID = 5;
  server[businessID][doctorID].addToQueue(new NewPatient(patientID));
  patientID = 6;
  server[businessID][doctorID].addToQueue(new NewPatient(patientID));

  //    console.log(Object.keys(server).forEach(key => console.log(Object.keys(server[key]))))
}, 1000);
/** status info */
setTimeout(() => {
  // //Testing code inside here
  let businessID = 1;
  let doctorID = 3;
  let patientID = 7;
  // server[businessID][doctorID].addToQueue(new NewPatient(patientID));
  server[businessID][doctorID].addToQueue(new NewPatient(patientID));
  patientID = 8;
  server[businessID][doctorID].addToQueue(new NewPatient(patientID));
  patientID = 9;
  server[businessID][doctorID].addToQueue(new NewPatient(patientID));

  //    console.log(Object.keys(server).forEach(key => console.log(Object.keys(server[key]))))
}, 1000);
const reviewRouter = new ReviewRouter(express, jwt, knex, authClass);