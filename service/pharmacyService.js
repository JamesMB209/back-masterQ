const QueueMethods = require("./queueMethods");

class Pharmacy extends QueueMethods {
	constructor() {
		super()
		this.id = "pharmacy"
		this.stateManager = "PHARMACY"
		this.designator = { doctor: "Pharmacy", room: "Pharmacy"}
	}
}

module.exports = Pharmacy;