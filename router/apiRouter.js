class ApiRouter {
  constructor(express, jwt, knex, auth) {
    this.express = express;
    this.jwt = jwt;
    this.knex = knex;
    this.auth = auth;
  }

  router() {
    let router = this.express.Router();
    router.get("/config", this.auth.authenticate(), this.config.bind(this));
    router.get("/patients", this.auth.authenticate(), this.patientConfig.bind(this)); // auth was missing here. we really need it on this one if its broken something.
    return router;
  }
  
  async config(req, res) {
    try {
      let business = await this.knex("business_users").select("id", "name");
      let doctors = await this.knex("doctors")
        .select("business_id", "id", "f_name", "l_name")
        .where("employed", true)
        .andWhere("active", true);
      res.send({
        business: business,
        doctors: doctors,
      });
    } catch (err) {
      console.error(err);
    }
  }

  async patientConfig(req, res) {
    try {
      let response = await this.knex("patients").select("*");
      res.send(response);
    } catch (err) {
      console.error(err);
    }
  }
}


module.exports = ApiRouter;
