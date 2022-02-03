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
        router.get("/patient", this.auth.authenticate(), this.patient.bind(this));
        router.get("/doctor", this.auth.authenticate(), this.doctor.bind(this));
        router.get("/business", this.auth.authenticate(), this.business.bind(this));
        return router;
    }

    patient(req, res) {
        console.log("patient router ran")
        let business = req.body.business;
        let doctor = req.body.doctor;
        let patient = req.body.patient;

        server[business][doctor].patient(patient).then((patient) => res.send(patient))
    }

    doctor(req, res) {
        console.log("doctor router ran")
        let business = req.body.business;
        let doctor = req.body.doctor;
        let patient = req.body.patient;

        res.send(server[business][doctor])
    }

    business(req, res) {
        console.log("business router ran")
        let business = req.body.business;
        let doctor = req.body.doctor;
        let patient = req.body.patient;

        res.send(server[business])
    }

}
module.exports = ObjRouter;
