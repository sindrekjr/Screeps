var role = {
    run: function(creep) {
        targets(creep);
        
	    if(creep.carry.energy < creep.carryCapacity) {
            var sources = creep.room.find(FIND_SOURCES);
            if(creep.harvest(sources[creep.memory.target]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(sources[creep.memory.target]);
            }
        } else {
            var container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (((structure.structureType == STRUCTURE_CONTAINER) && (_.sum(structure.store) < structure.storeCapacity))
                    || ((structure.structureType == STRUCTURE_EXTENSION) && (structure.energy < structure.energyCapacity))
                    )
                }
            });
            if(creep.transfer(container, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                creep.moveTo(container);
            }
        }
	}
}

function targets(creep) {
    var harvesters = _.filter(Game.creeps, (other) => {return ((other.memory.role == "harvester") && (other.memory.target == 0) && (other !== creep))});
    if(harvesters.length > 3) {
        creep.memory.target = 1;
    } else {
        creep.memory.target = 0;
    }
}

module.exports = role;