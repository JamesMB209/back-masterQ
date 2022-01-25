class Business {
    constructor(PharmacyClass) {
        // this.Pharmacy = PharmacyClass;
        this.id;
        this.pharmacy;
    }

    init (database) {
        // request the id from the table
        this.id = '3';
        // and load the doctors from the table // init the doctor class inside here.
        database.forEach(doctor => this[doctor.id] = doctor);

        this.pharmacy = new Pharmacy("pharmacy");
    } 
}

module.exports = Business;