"use strict";

module.exports = {
	run: function(spawn) {
        this.p = this.sp[spawn.name];
        
		let harvesters = spawn.room.find(FIND_MY_CREEPS, {filter: (creep) => creep.memory.role == "harvester"});
		if(harvesters.length < this.p.harvesters.amount) {
		    if(!pop(spawn, this.p.harvesters.body, "harvester")) console.log("Less than " + this.p.harvesters.amount + " harvesters remaining... (" + harvesters.length + ")");
		}

		let couriers = spawn.room.find(FIND_MY_CREEPS, {filter: (creep) => creep.memory.role == "courier"});
		if(couriers.length < this.p.couriers.amount) {
			if(!pop(spawn, this.p.couriers.body, "courier")) console.log("Less than " + this.p.couriers.amount + " couriers remaining... (" + couriers.length + ")");
		}

		let upgraders = spawn.room.find(FIND_MY_CREEPS, {filter: (creep) => creep.memory.role == "upgrader"});
		if(upgraders.length < this.p.upgraders.amount) {
			if(!pop(spawn, this.p.upgraders.body, "upgrader")) console.log("Less than " + this.p.upgraders.amount + " upgraders remaining... (" + upgraders.length + ")");
		}

		let builders = spawn.room.find(FIND_MY_CREEPS, {filter: (creep) => creep.memory.role == "builder"});
		if(builders.length < this.p.builders.amount) {
			if(!pop(spawn, this.p.builders.body, "builder")) console.log("Less than " + this.p.builders.amount + " builders remaining... (" + builders.length + ")");
		}

		let protectors = spawn.room.find(FIND_MY_CREEPS, {filter: (creep) => creep.memory.role == "protector"});
		if(protectors.length < this.p.protectors.amount) {
			if(!pop(spawn, this.p.protectors.body, "protector")) console.log("Less than " + this.p.protectors.amount + " protectors remaining... (" + protectors.length + ")");
		}
	}
}


function pop(spawn, body, r) {
	if(spawn.canCreateCreep(body) == OK) {
		spawn.createCreep(body, undefined, {role: r});
		console.log("Spawning new " + r + " at " + spawn.name);
		return true;
	} else {
		return false;
	}
}