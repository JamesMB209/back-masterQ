const knexFile = require('../knexfile');
const knex = require('knex')(knexFile[process.env.ENVIROMENT]);
const Doctor = require('./doctorService');
const Pharmacy = require('./pharmacyService');

class Business {
    constructor(business) {
        this.id = business.id
        this.pharmacy;
        this.init();
    }

    async init() {
        try {
            let doctors = await knex("doctors")
                .select("*")
                .where("business_id", this.id);

                doctors.forEach(doctor => this[doctor.id] = new Doctor(doctor));

            this.pharmacy = new Pharmacy();
        } catch (err) {
            console.log('failed to init doctors and/or pharmacy.')
            console.error(err);
        }
    }
}

module.exports = Business;