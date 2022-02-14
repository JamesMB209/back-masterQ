class DiagnosisRouter {
    constructor(express, jwt, knex, auth) {
        this.express = express;
        this.jwt = jwt;
        this.knex = knex;
        this.auth = auth;
    }

    router() {
        let router = this.express.Router();
        router.get("/load", this.auth.authenticate(), this.get.bind(this));
        router.post("/submit", this.auth.authenticate(), this.post.bind(this));
        return router;
    }


    /** Get the diagnosis history of the patient, requires the PatientID as a int or string */
    async get(req, res) {
        const data = req.body;

        try {
        let history = await this.knex
            .select(
                'diagnosis.created_at',
                'diagnosis.diagnosis'
            )
            .from('appointment_history')
            .leftJoin('diagnosis', 'diagnosis.appointment_id', 'appointment_history.id')
            .leftJoin('patients', 'patients.id', 'appointment_history.patient_id') 
            .where('patients.id', '=', data.patientID)

            res.send(history);

            } catch (err) {
                console.log("error")

            }
            
    }

    /** Post a new entry to the diagnosis table, requires the PatientOBJ's appointmentHistoryID */
    async post(req, res) {
        const data = req.body;

        try {
            await this.knex("diagnosis")
                .insert({
                    appointment_id: data.appointmentHistoryID,
                    diagnosis: data.diagnosis,
                    follow_up: data.followUp, //bool
                    sick_leave: data.sickLeave, //bool
                })

                res.sendStatus(201);
        } catch (err) {
            console.error(err)
            res.sendStatus(400);
        }
    }
}

module.exports = DiagnosisRouter;