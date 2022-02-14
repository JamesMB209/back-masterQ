const QueueMethods = require("./queueMethods");

class Doctor extends QueueMethods {
	constructor(doctor) {
		super ()
		this.id = doctor.id;
		this.stateManager = "DOCTOR"
		this.room = doctor.room;
		this.fullName = `${doctor.f_name} ${doctor.l_name}`;
		this.designator = { doctor: this.fullName, room: this.room}
		
		// this.businessID = doctor.business_id; // might not be required: reminder.
		// this.f_name = doctor.f_name;
		// this.l_name = doctor.l_name;
		// this.hkid = doctor.hkid;
		// this.phone = doctor.phone;
		// this.email = doctor.email;
		
	}
}

module.exports = Doctor;
