class ApiRouter {
    constructor(express, jwt, knex, authClass) {
        this.express = express
        this.jwt = jwt
        this.knex = knex
        this.authClass = authClass
    }

    router() {
        let router = this.express.Router()
        router.get('/config', this.config.bind(this))
        return router
    }
    async config(req, res) {
        try {
            let business = await this.knex('business_users')
                .select('id', 'name')
            let doctors = await this.knex('doctors')
                .select('business_id', 'id', 'f_name', 'l_name')
                .where("employed", true)
                .andWhere("active", true)
            res.send({
                business:business, 
                doctors:doctors
            })
        } catch (err) {
            console.error(err)
        }
    }
}
module.exports = ApiRouter;
