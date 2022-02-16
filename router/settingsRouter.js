class SettingsRouter {
  constructor(express, knex, auth) {
    this.express = express;
    this.knex = knex;
    this.auth = auth;
  }

  router() {
    let router = this.express.Router();
    router.post("/room",this.auth.authenticate(),  this.changeRoom.bind(this));
    router.post("/status",this.auth.authenticate(),  this.changeStatus.bind(this));
    return router;
  }

  async changeRoom(req, res) {
    console.log("change doctor room initiated");
    console.log(req.body);
    if (req.body.room && req.body.id) {
      let doctorId = req.body.id;
      let newRoom = req.body.room;
      let updateRoom = await this.knex("doctors")
        .where({ id: doctorId })
        .update({ room: newRoom });
    } else {
      console.log("doctor room not updated");
    }
  }

  async changeStatus(req, res) {
    console.log(req.body);
    if (req.body) {
      let doctor = req.body.doctor;
      let active = req.body.active;
      let employed = req.body.employed;
      let updateStatus = await this.knex("doctors")
        .where({ id: doctor })
        .update({ active: active, employed: employed });
      console.log(updateStatus);
    } else {
      console.log("doctor status not updated");
    }
  }
}

module.exports = SettingsRouter;
