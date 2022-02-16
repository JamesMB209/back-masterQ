const knexFile = require('../knexfile').development;
const knex = require('knex')(knexFile);

class History {

	/** 
	 * Adds a new booking to the history, requires the business object, doctor object, and patient object.
	 */
	async saveAppointmentHistoryCheckin(business, doctor, patient) {
		try {
			let [result] = await knex('appointment_history')
				.returning('id')
				.insert({
					business_id: business.id,
					doctor_id: doctor.id,
					patient_id: patient.id,
					arrival: new Date(),
					completed: false,
				})

			patient.appointmentHistoryID = result.id;

		} catch (err) {
			console.log(err)
		}
	}

	/** 
	 * Updates the history to show the time completed with the doctor requires the patient object.
	 */
	async saveAppointmentHistoryDoctor(business, doctor, patient) {

		if (patient === undefined) {
			console.error("There was no patient sent the the doctor history");
			return;
		}

		try {
			await knex('appointment_history')
				.where("id", "=", patient.appointmentHistoryID)
				.update({
					departure_doctor: new Date(),
				})

		} catch (err) {
			console.log(err)
		}
	}

	/** 
	 * Updates the history to show the time completed with the pharmacy/surgery requires the patient object.
	 */
	async saveAppointmentHistoryPharmacy(business, doctor, patient) {

		if (patient === undefined) {
			console.error("There was no patient sent the the pharmacy history");
			return;
		}

		try {
			await knex('appointment_history')
				.where("id", "=", patient.appointmentHistoryID)
				.update({
					departure_pharmacy: new Date(),
					completed: true,
				})
			console.log('success updating appointment history')
		} catch (err) {
			console.log(err)
		}
	}


	/** 
	 * Returns the diagnosis history of the respective patient ID 
	*/
	async diaganosisHistory(patientID) {
		try {
			let history = await knex
				.select(
					'diagnosis.created_at',
					'diagnosis.diagnosis'
				)
				.from('appointment_history')
				.leftJoin('diagnosis', 'diagnosis.appointment_id', 'appointment_history.id')
				.leftJoin('patients', 'patients.id', 'appointment_history.patient_id')
				.where('patients.id', '=', this.patientID)

			return history
		} catch (err) {
			console.log(err);
		}
	}


	// -------------- old DRQ ------------//
	/** 
	 * inserts a new row into the "diagnosis table"
	 */
	saveDiagnosis(data) {

		if (diagnosis === undefined || patient === undefined) {
			return;
		}

		knex('diagnosis')
			.insert({
				appointment_id: data.appointmentHistoryID,
				diagnosis: data.diagnosis,
				follow_up: data.follow_up,
				sick_leave: false,

			}).then(() => {
				console.log("a diagnosis was saved to the database")
			}).catch((err) => {
				console.error(err);
			})
	}

}

module.exports = History;