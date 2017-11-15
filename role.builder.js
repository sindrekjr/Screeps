var roleBuilder = {
    run:function(creep) {
        if(creep.memory.building && creep.carry.energy == 0) {
            creep.memory.building = false;
            creep.say("Harvesting!");
        }
        if(!creep.memory.building && creep.carry.energy == creep.carryCapacity) {
            creep.memory.building = true;
            creep.say("Building!");
        }
        
        if(creep.memory.building) {
            var damagedStructures = creep.room.find(FIND_STRUCTURES, {filter: object => object.hits < object.hitsMax});
            var sites = creep.room.find(FIND_CONSTRUCTION_SITES);
            if(sites.length) {
                if(creep.build(sites[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(sites[0]);
                }
            } else if(damagedStructures.length) {
                if(creep.repair(damagedStructures[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(damagedStructures[0]);
                }
            }
        } else {
            var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return ((structure.structureType == STRUCTURE_CONTAINER) && (structure.store[RESOURCE_ENERGY] > 500))
                }
            });
            var sources = creep.pos.findClosestByPath(FIND_SOURCES);
            //var sources = creep.room.find(FIND_SOURCES);
            if(container) {
                if(creep.withdraw(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(container);
                }
            } else if(creep.harvest(sources) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources);
            }
	    }
    }
}

module.exports = roleBuilder;