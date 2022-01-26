const knexFile = require('../knexfile');
const knex = require('knex')(knexFile[process.env.ENVIROMENT]);
const Business = require('./businessService');

class Server {
    constructor() {
        this.init();
    }

    async init () {
        try {
            let business_users = await knex("business_users").select('*');
    
            business_users.forEach(business => {
                this[business.id] = new Business(business)
            });
    
        } catch (err) {
            console.log("failed to init business")
            console.error(err);
        }
    }

    async reload (data) {
        // console.log(this[data.id]);
        try {
            let [business] = await knex("business_users").select('*').where("id", data.id);
            // console.log(business);
            this[business.id] = new Business(business);
        } catch (err) {
            console.log("failed to reload business")
            console.error(err);
        }
    }
}

module.exports = Server;