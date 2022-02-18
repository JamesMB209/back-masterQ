/** Imports from  NPM*/
const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const knexFile = require("./knexfile.js");
const knex = require("knex")(knexFile[process.env.ENVIROMENT]);
const jwt = require("jsonwebtoken");
const authClass = require("./auth")();
const config = require("./config")

/** Imports from local code */
const History = require("./service/historyService");
const NewPatient = require("./service/newPatientService");
const Queue = require("./service/queueService");
const SettingsRouter = require("./router/settingsRouter");
const AuthRouter = require("./router/authRouter.js")
const ApiRouter = require("./router/apiRouter");
const ObjRouter = require("./router/objRouter.js");
const ReviewRouter = require("./router/reviewRouter");
const DiagnosisRouter = require("./router/diagnosisRouter");
const PharmacyRouter = require("./router/pharmacyRouter");
const BookingRouter = require("./router/bookingRouter");

/** App configuration */
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(authClass.initialize());

/** Socket config */
const http = require("http").createServer(app);
const io = require("socket.io")(http);

/** App/Socket init */
http.listen(process.env.PORT);
console.log(`Backend running on port: ${process.env.PORT} using the ${process.env.ENVIROMENT} enviroment`);

/** Create server\classes */
const server = new Queue();
const history = new History();

/** Init routers */
const authRouter = new AuthRouter(express, jwt, knex, config)
const objRouter = new ObjRouter(express, knex, authClass, server);
const settingsRouter = new SettingsRouter(express, knex, authClass);
const apiRouter = new ApiRouter(express, knex, authClass);
const reviewRouter = new ReviewRouter(express, knex, authClass);
const diagnosisRouter = new DiagnosisRouter(express, knex, authClass);
const pharmacyRouter = new PharmacyRouter(express, knex, authClass);
const bookingRouter = new BookingRouter(express, knex, authClass);

/** Router */
app.use("/", authRouter.router());
app.use("/api", apiRouter.router());
app.use("/obj", objRouter.router());
app.use('/review', reviewRouter.router());
app.use("/setting", settingsRouter.router())
app.use("/diagnosis", diagnosisRouter.router());
app.use("/pharmacy", pharmacyRouter.router());
app.use("/booking", bookingRouter.router());

/** Socket Logic - to abstract later - you know or maybe not */
io
    .use(function (socket, next) {
        if (socket.handshake.query && socket.handshake.query.token) {
            jwt.verify(socket.handshake.query.token, config.jwtSecret, function (err, decoded) {
                if (err) return next(new Error("Authentication error"));
                socket.decoded = decoded;
                next();
            });
        }
        else {
            next(new Error("Authentication error"));
        }
    })
    .on("connection", (socket) => {
        console.log(`CONNECTED: socket user - ${socket.decoded.id}`);

        //If the account is a business, add it to its own "room".
        if (socket.decoded.table === "business_users") {
            console.log(`User ${socket.decoded.id} got initialised as a business`)
            socket.join(`Business:${socket.decoded.id}`)
        }

        const loadDataPatient = (data) => {
            let business = server[data.business];
            let doctor = server[data.business][data.doctor];
            let patientID = socket.decoded.id;
            return [business, doctor, patientID]
        }

        const loadDataBusiness = (data) => {
            let business = server[socket.decoded.id];
            let doctor = server[socket.decoded.id][data.doctor];
            let patientID = data.patientID;
            return [business, doctor, patientID]
        }

        const emitUpdate = (businessID, doctorID) => {
            let queue = `${businessID}:${doctorID}`
            let business = `Business:${businessID}`

            console.log(`emitted update to ${businessID}:${doctorID}`)
            io.to(queue).emit("UPDATE_PATIENT");
            io.to(business).emit("UPDATE_BUSINESS");
        }

        /** 
         * 
         * Patient room managers 
         * 
         * */

        socket.on("DOCTOR_ROOM", (data) => {
            if (data.business == null || data.doctor == null || data.business == "" || data.doctor == "") { console.log(`Invalid data`); return }
            let [business, doctor, patientID] = loadDataPatient(data);

            /** Update actions */
            socket.join(`${business.id}:${doctor.id}`);
        })

        socket.on("PHARMACY_ROOM", (data) => {
            if (data.business == null || data.doctor == null || data.business == "" || data.doctor == "") { console.log(`Invalid data`); return }
            let [business, doctor, patientID] = loadDataPatient(data);

            /** Update actions */
            socket.leave(`${business.id}:${doctor.id}`);
            socket.join(`${business.id}:pharmacy`)
        })

        socket.on("CHECKOUT", (data) => {
            if (data.business == null || data.doctor == null || data.business == "" || data.doctor == "") { console.log(`Invalid data`); return }
            let [business, doctor, patientID] = loadDataPatient(data);

            /** Update actions */
            socket.leave(`${business.id}:${doctor.id}`);
            socket.leave(`${business.id}:pharmacy`)
        })

         /** 
         * 
         * Patient front end buttons 
         * 
         * */

        socket.on("CHECKIN", (data) => {
            if (data.business == null || data.doctor == null || data.business == "" || data.doctor == "") { console.log(`Invalid data`); return }
            let [business, doctor, patientID] = loadDataPatient(data);

            let patient = new NewPatient(patientID);

            /** Queue actions */
            doctor.addToQueue(patient);

            /** History actions */
            history.saveAppointmentHistoryCheckin(business, doctor, patient);

            /** Update actions */
            emitUpdate(business.id, doctor.id)
            socket.emit("UPDATE_PATIENT");
        })

        /** 
         * 
         * Business front end buttons 
         * 
         * */

        socket.on("NEXT", (data) => {
            if (data.doctor == null) { console.log(`Invalid data`); return }

            let [business, doctor, patientID] = loadDataBusiness(data);

            /** Queue actions */
            let patient = doctor.next();

            if (doctor.id !== "pharmacy" && patient !== undefined) {
                /** Logic for a patient departing a doctors queue */

                /** History actions */
                history.saveAppointmentHistoryDoctor(business, doctor, patient);

                /** Append patient data*/
                if (data.prescribedDrugs) { patient.prescribedDrugs = data.prescribedDrugs }
                if (data.documentation) {patient.documents = data.documentation}

                /** move the patient to the pharmacy queue */
                business.pharmacy.addToQueue(patient)

            } else if (doctor.id === "pharmacy" && patient !== undefined) {
                /** Logic for a patient departing the pharmacy queue */

                /** History actions */
                history.saveAppointmentHistoryPharmacy(business, doctor, patient);
            }

            /** Update actions */
            emitUpdate(business.id, doctor.id)
        });

        socket.on("MOVE_UP", (data) => {
            if (data.doctor == null) { console.log(`Invalid data`); return }

            let [business, doctor, patientID] = loadDataBusiness(data);

            /** Queue actions */
            doctor.move(patientID);

            /** Update actions */
            emitUpdate(business.id, doctor.id)
        });

        socket.on("DELETE", (data) => {
            if (data.doctor == null) { console.log(`Invalid data`); return }

            let [business, doctor, patientID] = loadDataBusiness(data);

            /** Queue actions */
            doctor.remove(patientID);

            /** Update actions */
            emitUpdate(business.id, doctor.id)
        });

        socket.on("RELOAD", () => {
            let business = server[socket.decoded.id];

            /** Queue actions */
            server.reload(business)

            /** Update actions */
            socket.emit("UPDATE_BUSINESS");
            //  emitUpdate(business.id, doctor.id)
        })

        socket.on("disconnect", () => {
            console.log(`DISCONNECTED: socket user - ${socket.decoded.id}`);
        })
    });

app.get("/", (req, res) => {
    res.send("Online")
})

/** Add some fake patients with history */
setTimeout(() => {
    let businessID = 1;
    let doctorID = Object.keys(server[businessID]).filter((key) => key.length === 1);
    let patients = [1, 3, 5, 8, 11, 12];

    for (index in doctorID) {
        for (patientID in patients) {
            let patient = new NewPatient(patients[patientID])

            /** Queue actions */
            server[businessID][doctorID[index]].addToQueue(patient);

            /** History actions */
            history.saveAppointmentHistoryCheckin(server[businessID], server[businessID][doctorID[index]], patient);

            console.log("Added patient with ID:" + patients[patientID])
        }
    }
}, 1000)
