const QueueMethods = require("./queueMethods");

class Doctor extends QueueMethods {
	constructor(doctor) {
		super ()
		this.id = doctor.id;
		this.stateManager = "DOCTOR"
		this.room = doctor.room;
		this.fullName = `${doctor.f_name} ${doctor.l_name}`;
		this.designator = { doctor: this.fullName, room: this.room}
	}
}

module.exports = Doctor;
