class ReviewRouter {
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


    async get(req, res) {
        const data = req.params;
        try {
            let bookings = await this.knex("booking")
                .select("*")
                .where("business_id", data.businessID)
                .andWhere("doctor_id", data.doctorID)

            res.sendStatus(201);
        } catch (err) {
            console.error(err)
            res.sendStatus(422);
        }
    }

    async post(req, res) {
        const data = req.body;
        try {
            await this.knex("booking")
                .insert({
                    business_id: data.businessID,
                    doctor_id: data.doctorID,
                    patient_id: req.user[0].id,
                    date_time: data.dateTime
                })

            res.sendStatus(201);
        } catch (err) {
            console.error(err)
            res.sendStatus(422);
        }
    }
}

module.exports = ReviewRouter;