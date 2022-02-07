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

	/** 
	 * Adds a new booking the the history, requires the business object, Doctor object, and patient object.
	 * 4th value is a flag if the booking was completed.  (default: true)
	 * 5th value for checked in. (default: true)
	 */
	async saveAppointmentHistoryDoctor(business, doctor, patient, completed = false) {

		if (patient === undefined) {
			console.error("There was no patient sent the the doctor history");
			return;
		}

		console.log("tried to save to the database")

		try {
			let appointmentHistoryID = await knex('appointment_history')
				.returning('id')
				.insert({
					business_id: business.id,
					doctor_id: doctor.id,
					patient_id: patient.id,
					arrival: patient.arrived,
					departure_doctor: new Date(),
					completed: completed,
				})

			patient.appointmentHistoryID = appointmentHistoryID;

		} catch (err) {
			console.log(err)
		}
	}

	async saveAppointmentHistoryPharmacy(business, doctor, patient, completed = true) {

		if (patient === undefined) {
			console.error("There was no patient sent the the pharmacy history");
			return;
		}

		console.log("tried to save to the database _ pharmacy")

		try {
			await knex('appointment_history')
				.where("id", "=", patient.appointmentHistoryID)
				.update({
					departure_pharmacy: new Date(),
					completed: completed,
				})
				console.log('success updating appointment history')
		} catch (err) {
			console.log(err)
		}
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