class SettingsRouter {
  constructor(express, jwt, knex, auth, server) {
    this.express = express;
    this.jwt = jwt;
    this.knex = knex;
    this.auth = auth;
    this.server = server;
  }

  router() {
    let router = this.express.Router();
    router.post("/room", this.changeRoom.bind(this));
    router.post("/status", this.changeStatus.bind(this));
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
    console.log("change doctor status initiated");
  }
  
}

module.exports = SettingsRouter;
