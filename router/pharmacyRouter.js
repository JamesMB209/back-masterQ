class PharmacyRouter {
    constructor(express, jwt, knex, auth) {
        this.express = express;
        this.knex = knex;
        this.auth = auth;
    }

    router() {
        let router = this.express.Router();
        router.get("/load", this.auth.authenticate(), this.get.bind(this));
        router.put("/update", this.auth.authenticate(), this.put.bind(this));
        return router;
    }


    async get(req, res) {
        try {
            let inventory = await this.knex("inventory")
                .select("sku", "drug", "dosage", "price", "stock", "cost")
                .where("business_id",  req.user[0].id)

            res.send(JSON.stringify(inventory));

        } catch (err) {
            console.log(err)
            res.sendStatus(400);
        }
    }

    async put(req, res) {
        const data = req.body;

        try {
            // await this.knex("doctors_review")
            //     .insert({
            //         appointment_id: data.appointmentHistoryID,
            //         score: data.score,
            //         review: data.review
            //     })

            //     res.sendStatus(201);

        } catch (err) {
            console.error(err)
            res.sendStatus(422);
        }
    }
}

module.exports = PharmacyRouter;