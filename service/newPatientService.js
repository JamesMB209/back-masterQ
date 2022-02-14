const knexFile = require('../knexfile');
const knex = require('knex')(knexFile[process.env.ENVIROMENT]);
// const History = require("./historyService");

class NewPatient {
    constructor(id) {
        this.id = id;
        this.history = [];
        this.init();
    }

    async init() {
        try {
            let [user] = await knex
                .select('*')
                .from('patients')
                .where({
                    id: this.id
                })

            delete user.password;
            Object.assign(this, user);
            ////////// DO NOT DELETE PLEASE I NEED THIS!!!! //////////////
            let history = await knex
            .select(
                'diagnosis.created_at',
                'diagnosis.diagnosis'
            )
            .from('appointment_history')
            .leftJoin('diagnosis', 'diagnosis.appointment_id', 'appointment_history.id')
            .leftJoin('patients', 'patients.id', 'appointment_history.patient_id') 
            .where('patients.id', '=', this.id)
            
            history.forEach(row => this.history.push(row));

        } catch (err) {
            console.log(err);
        }
    }
}

module.exports = NewPatient;