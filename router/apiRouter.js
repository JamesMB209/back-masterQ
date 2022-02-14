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
      // let response = await this.knex("appointment_history").select("*").where("business_id", req.user[0].id)
      let response = await this.knex
        .select("f_name", "l_name", "hkid", "email", "gender", "dob", "phone", "drug_allergy")
        .from("patients")
        .leftJoin("appointment_history", "patients.id", "appointment_history.patient_id")
        .where("appointment_history.business_id", req.user[0].id)
      res.send(response)
    } catch (error) {
      console.log(`MASSIVE FATLOAD OF ERROR ${error}`)
    }
  }
}


module.exports = ApiRouter;
