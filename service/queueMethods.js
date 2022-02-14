class QueueMethods {
	constructor() {
		this.queue = [];
		this.stateManager = "CHECKIN"
		this.designator = { doctor: "Not assigned", room: "Not assigned" }
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
	 * Adds a patient object to the respective queue and any information about that queue/doctor.
	 */
	addToQueue(patient) {
		this.patient(patient.id)
			//first check if the patient is in the queue, if they are error.
			.then(() => console.log(`The patient was already in one of the queues related to:${this.stateManager}`))
			//else add them
			.catch(() => {
				patient.assigned = this.designator;
				patient.state = this.stateManager;
				patient.queuePosition = this.length(); //This sets a default queue position specificly for the pharmacy service.
				this.queue.push(patient);
			})
	}

	/**
	 * Advances the queue by one, by return the patient in position 0.
	 */
	next() {
		return this.queue.shift();
	}

	/**
	 * Returns the number of patients in the Queue.
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
		let patient = this.patientIndex(id)
		this.queue.splice(patient, 1);
		return patient;
	}
}

module.exports = QueueMethods;
