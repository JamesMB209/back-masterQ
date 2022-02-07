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


    get(req, res) {

        // business id and return all reviews for their employed doctors
        // Write this is if we want to review the patient reviews.
    }

    async post(req, res) {

        const data = req.body;
        try {
            await this.knex("doctors_review")
                .insert({
                    appointment_id: data.appointmentHistoryID,
                    score: data.score,
                    review: data.review
                })

                res.sendStatus(201);
        } catch (err) {
            console.error(err)
            res.sendStatus(422);
        }
    }
}

module.exports = ReviewRouter;