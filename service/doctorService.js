class Doctor {
	constructor(doctor) {
		this.id = doctor.id;
		this.businessID = doctor.business_id; // might not be required: reminder.
		this.f_name = doctor.f_name;
		this.l_name = doctor.l_name;
		this.hkid = doctor.hkid;
		this.phone = doctor.phone;
		this.email = doctor.email;
		this.room = doctor.room;

		this.fullName = `${doctor.f_name} ${doctor.l_name}`;
		this.queue = [];

	}

	/**
	 * Returns a promise of the patient object from the id if exists.
	 */
	patient(id) {
		return new Promise((res, rej) => {
			if (this.queue.findIndex(patient => patient.id == id) === -1) { rej("patient not found.") };
			let patient = this.queue.find(patient => patient.id == id);

			patient.queuePosition = this.queue.findIndex(patient => patient.id == id);
			res(patient);
		})
	}

	/**
	 * Returns the index of the patient.
	 */
	patientIndex(id) {
		return this.queue.findIndex(patient => patient.id == id);
	}

	/**
	 * Adds a patient object to the respective doctors queue and any information about that queue/doctor.
	 */
	addToQueue(patient) {
		this.patient(patient.id)
			//first check if the patient is in the queue, if they are error.
			.then(() => console.log('the patient was already in the queue'))
			//else add them
			.catch(() => {
				patient.assigned = { doctor: this.fullName, room: this.room }
				patient.state = "DOCTOR"
				patient.doctor = this.id;
				this.queue.push(patient);
			})
	}

	/**
	 * Advances the doctors queue by one, by removing the patient in position 0.
	 */
	next() {
		return this.queue.shift();
	}

	/**
	 * Returns the number of people in the Queue.
	 */
	length() {
		return this.queue.length;
	}

	/**
	 * Move the patient referenced by the id to the specified position. Default 1 (first inline).
	 */
	move(id, position = 1) {
		this.patient(id).then(patient => {
			if (this.patientIndex(id) > 1) {
				this.queue.splice(this.patientIndex(id), 1);
				this.queue.splice(position, 0, patient);
			}
		}).catch(() => {
			console.log(`Error no patient found with id: ${id} in queue:${this.id}`)
		})
	}

	/**
	 * removes the patient with the specified id.
	 */
	remove(id) {
		this.queue.splice(this.patientIndex(id), 1);
	}
}

module.exports = Doctor;
