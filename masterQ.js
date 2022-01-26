class Pharmacy {
    constructor() {
    }

    stock () {
        console.log("drugs n shit");
    }
}

class Doctor {
    constructor(doctor) {
        this.id = doctor.id;
        this.fName = doctor.f_name;
        this.lName = doctor.l_name;
        this.room = doctor.room;
        
        this.fullName = `${doctor.f_name} ${doctor.l_name}`;
        this.queue = [];
        this.init();
    }

    init () {
        // load own id from the table.

    }
    
    patient(hkid) {
        /**
         * Returns a promise of the patient object from the HKID if exists.
         */
        return new Promise((res, rej) => {
            if (this.queue.findIndex(patient => patient.hkid == hkid) === -1) { rej() };
            let patient = this.queue.find(patient => patient.hkid == hkid);
            
            patient.queuePosition = this.queue.findIndex(patient => patient.hkid == hkid);
            res(patient);
        })
    }

    patientIndex(hkid) {
        /**
         * Returns the index of the patient.
         */
        return this.queue.findIndex(patient => patient.hkid == hkid);
    }
    
    addToQueue(patient) {
        /**
         * Adds a patient object to the respective doctors queue.
         */
        this.queue.push(patient);
    }
    
    next() {
        /**
         * Advances the doctors queue by one, by removing the patient in position 0.
         */
        this.queue.shift()
    }
    
    length() {
        /**
         * Returns the number of people in the Queue.
         */
        return this.queue.length;
    }

    move(hkid, position = 1) {
        /**
         * Move the patient referenced by the HKID to the specified position. Default 1 (first inline).
         */
        this.patient(hkid).then(patient => {
            if (this.patientIndex(hkid) > 1) {
                this.queue.splice(this.patientIndex(hkid), 1);
                this.queue.splice(position, 0, patient);
            }
        })
    }
    
    remove(hkid) {
        /**
         * removes the patient with the specified HKID.
         */
        this.queue.splice(this.patientIndex(hkid), 1);
    }
}

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


//////Fake Database ///////////////////////////////////////////////
let doctor1 = {
    id: 4,
    f_name: "james", 
    l_name: "betts", 
    room: "string"
}

let doctor2 = {
    id: 5,
    f_name: "james", 
    l_name: "betts", 
    room: "string"
}

doctor1 = new Doctor(doctor1);
doctor2 = new Doctor(doctor2);

let business1 = new Business();
let business2 = new Business();

let databaseDoctors = [doctor1, doctor2]
let databaseBusiness = [business1, business2]
///////END Fake database ///////////////////////////////////////////

// let pharmacy = new Pharmacy("pharmacy");

// let business = {id:"4", doctors:[], pharmacy:pharmacy}

// let id = doctor1.id;
// business.doctors=[doctor1, doctor2]


// let business = new Business();
business1.init(databaseDoctors);
business2.init(databaseDoctors);
business2.id = "6";

// databaseDoctors.forEach(doctor => business[doctor.id] = doctor);
// business["pharmacy"] = "pharmacy object"
// let test = new Object();

let server = {}; 
server[business1.id] = business1;
server[business2.id] = business2;



let doctorID = "4";
let bussinessID = "6";

server[bussinessID][doctorID].addToQueue("patient");

console.log(server[bussinessID][doctorID].queue);
// console.log(server);
// console.log(business2);
// console.log(business1);