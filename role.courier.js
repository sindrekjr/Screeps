var role = {
    run: function(creep) {
        if(creep.memory.transporting && creep.carry.energy == 0) {
            creep.memory.transporting = false;
            creep.say("Fetching!");
        } else if(!creep.memory.transporting && creep.carry.energy == creep.carryCapacity) {
            creep.memory.transporting = true;
            creep.say("Moving!");
        }
        
        if(creep.memory.transporting) {
            var towers = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_TOWER && structure.energy < 10)
                }
            });
            var targets = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (
                            structure.structureType == STRUCTURE_STORAGE 
                            || structure.structureType == STRUCTURE_EXTENSION 
                            || structure.structureType == STRUCTURE_SPAWN 
                            || structure.structureType == STRUCTURE_TOWER
                            ) 
                        && (structure.energy < structure.energyCapacity);
                    }
            });
            /*if(towers.length) {
                if(creep.transfer(towers[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(towers[0]);
                }
            } else */if(targets.length) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0]);
                }
            }
        } else {
            if(creep.carry.energy < creep.carryCapacity) {
                var drops = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
                    filter: (drop) => {
                        return (drop.energy >= 50);
                    }
                });
                var containers = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return ((structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > 0))
                    }
                });
                if(drops) {
                    if(creep.pickup(drops) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(drops);
                    }
                } else if(containers) {
                    if(creep.withdraw(containers, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                        creep.moveTo(containers);
                    }
                }
            }
        }
	}
}

module.exports = role;