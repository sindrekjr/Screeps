module.exports = {
	run: function(spawn) {

		let harvesters = spawn.room.find(FIND_MY_CREEPS, {filter: (creep) => creep.memory.role == "harvester"});
		if(harvesters.length < this.p.harvesters) {
		    if(!populate(spawn, "harvester")) console.log("Less than " + this.p.harvesters + " harvesters remaining...");
		}

		let couriers = spawn.room.find(FIND_MY_CREEPS, {filter: (creep) => creep.memory.role == "courier"});
		if(couriers.length < this.p.couriers) {
			if(!populate(spawn, "courier")) console.log("Less than " + this.p.couriers + " couriers remaining...");
		}

		let upgraders = spawn.room.find(FIND_MY_CREEPS, {filter: (creep) => creep.memory.role == "upgrader"});
		if(upgraders.length < this.p.upgraders) {
			if(!populate(spawn, "upgrader")) console.log("Less than " + this.p.upgraders + " upgraders remaining...");
		}

		let builders = spawn.room.find(FIND_MY_CREEPS, {filter: (creep) => creep.memory.role == "builder"});
		if(builders.length < this.p.builders) {
			if(!populate(spawn, "builder")) console.log("Less than " + this.p.builders + " builders remaining...");
		}

		let protectors = spawn.room.find(FIND_MY_CREEPS, {filter: (creep) => creep.memory.role == "protector"});
		if(protectors.length < this.p.protectors) {
			if(!populate(spawn, "protector")) console.log("Less than " + this.p.protectors + " protectors remaining...");
		}
	}
}

function populate(spawn, role) {
    let body; 
    
	switch(role.toLowerCase()) {
		case "harvester":
	    case "builder":
			body = [WORK,WORK,WORK,CARRY,MOVE];
			break;
		case "courier":
		    body = [CARRY,CARRY,MOVE,MOVE];
			break;
		case "upgrader":
		    body = [WORK,WORK,CARRY,CARRY,MOVE,MOVE];
			break;
		case "protector":
		    body = [TOUGH,TOUGH,TOUGH,MOVE,ATTACK,MOVE,ATTACK,ATTACK,ATTACK,MOVE];
			break;
		default: 
			
	}
	
	try {
	    return spawnCreep(spawn, body, role);
	} catch(e) {
	    console.log("Error: " + e);
	    return false; 
	}

	function spawnCreep(spawn, body, r) {
		if(spawn.canCreateCreep(body) == OK) {
			spawn.createCreep(body, undefined, {role: r});
			console.log("Spawning new " + role + " at " + spawn.name);
			return true;
		} else {
			return false;
		}
	}
}