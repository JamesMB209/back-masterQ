class ObjRouter {
    constructor(express, axios, jwt, knex, auth, server) {
        this.express = express;
        this.axios = axios;
        this.jwt = jwt;
        this.knex = knex;
        this.auth = auth;
        this.server = server;
    }

    router() {
        let router = this.express.Router();
        router.post("/patient", this.auth.authenticate(), this.patient.bind(this));
        router.post("/doctor", this.auth.authenticate(), this.doctor.bind(this));
        router.post("/business", this.auth.authenticate(), this.business.bind(this));
        return router;
    }


    /** only for patient front end */
    patient(req, res) {
        let business = req.body.business;
        let doctor = req.body.doctor;
        let patient = req.user[0].id;

        console.log(`The patient OBJ was requested for: ${business}:${doctor}, ${patient}`)

        this.server[business][doctor].patient(patient).then((patient) => {
            res.send(patient)
        }).catch(() => {
            this.server[business].pharmacy.patient(patient).then((patient) => {
                res.send(patient)
            }).catch(() => {
                res.send({ state: "REVIEW" })
            })
        })
    }

    doctor(req, res) {
        console.log("doctor router ran")
        let business = req.body.business;
        let doctor = req.body.doctor;

        res.send(this.server[business][doctor])
    }

    business(req, res) {
        console.log("business router ran")
        let business = req.body.business;

        res.send(this.server[business])
    }

}
module.exports = ObjRouter;
