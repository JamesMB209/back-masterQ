class Pharmacy {
    constructor() {
		this.id = "pharmacy"
		this.queue = [];
    }

    stock () {
        console.log("drugs n shit");
    }

    patient(id) {
		/**
		 * Returns a promise of the patient object from the id if exists.
		 */
		return new Promise((res, rej) => {
			if (this.queue.findIndex(patient => patient.id == id) === -1) { rej("patient not found.") };
			let patient = this.queue.find(patient => patient.id == id);
			
			patient.queuePosition = this.queue.findIndex(patient => patient.id == id);
			res(patient);
		})
	}

	patientIndex(id) {
		/**
		 * Returns the index of the patient.
		 */
		return this.queue.findIndex(patient => patient.id == id);
	}
	
	addToQueue(patient) {
		/**
		 * Adds a patient object to the respective doctors queue.
		 */
		patient.state = "PHARMACY";
		patient.doctor = this.id;
		this.queue.push(patient);
	}

	next() {
		/**
		 * Advances the doctors queue by one, by removing the patient in position 0.
		 */
		this.queue.shift();
	}

	length() {
		/**
		 * Returns the number of people in the Queue.
		 */
		return this.queue.length;
	}

	move(id, position=1) {
		/**
		 * Move the patient referenced by the id to the specified position. Default 1 (first inline).
		 */
		this.patient(id).then(patient => {
			if (this.patientIndex(id) > 1) {
				this.queue.splice(this.patientIndex(id), 1);
				this.queue.splice(position, 0, patient);
			}
		})
    }

	remove(id) {
		/**
		 * removes the patient with the specified id.
		 */
		this.queue.splice(this.patientIndex(id), 1);
	}
}

module.exports = Pharmacy;