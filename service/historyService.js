const knexFile = require('../knexfile').development;
const knex = require('knex')(knexFile);

class History {
	addPatient(patient) {
		/** 
		 * Adds a new patient to the "patient" database if none already exists 
		*/

		// return knex('patient')
		// .select("id")
		// .where('id_card', patient.hkid)
		// .then((row) => {
		// 	if(row.length === 1) {
		// 		return [row[0].id];
		// 	} else {
		// 	return knex('patient')
		// 	.insert({
		// 		f_name: patient.fName,
		// 		l_name: patient.lName,
		// 		id_card: patient.hkid,
		// 		dob: patient.dob,
		// 		gender: patient.gender,
		// 	})
		// 	.returning("id")
		// 	.catch((err) => {
		// 		console.error(err);
		// 	})
		// }
		// }).catch((err) => {
		// 	console.error(err);
		// })
	}

	saveBooking(patient, completed = true, checkedIn = true) {
		/** 
		 * Adds a new booking the the history, requires the patient object.
		 * second value is a flag if the booking was completed.  (default: true)
		 * third value for checked in. (default: true)
		 */

		if (patient === undefined) {
			console.error("There are no patients left");
			return;
		}

		knex('appointment_history')
			.insert({
				patient_id: patient.id,
				doctor_id: patient.assignedDoctor,
				arrival: patient.arrived,
				departure: new Date(),
				checked_in: checkedIn,
				completed: completed,
			}).then(() => {
				console.log("an appointment was saved to the database")
			}).catch((err) => {
				console.error(err);
			})
	}

	/** 
	 * inserts a new row into the "diagnosis table"
	 */
	saveDiagnosis(doctorId, patient, diagnosis) {

		if (diagnosis === undefined || patient === undefined) {
			return;
		}

		knex('diagnosis')
			.insert({
				patient_id: patient.id,
				doctor_id: doctorId,
				diagnosis: diagnosis,
			}).then(() => {
				console.log("a diagnosis was saved to the database")
			}).catch((err) => {
				console.error(err);
			})
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
}

module.exports = History;