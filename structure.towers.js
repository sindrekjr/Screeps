var config = {
    run: function() {
        var tower = Game.getObjectById('588ba6940659c46d33c3665e');
        if(tower) {
            var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
            var hurtCreeps = tower.room.find(FIND_MY_CREEPS, {filter: (creep) => creep.hits < creep.hitsMax})
            if(closestHostile) {
                tower.attack(closestHostile);
            } else if(hurtCreeps.length) {
                tower.heal(hurtCreeps[0]);
            } else {
                var damagedStructures = tower.pos.findClosestByRange(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (((structure.structureType == STRUCTURE_WALL || structure.structureType == STRUCTURE_RAMPART) && (structure.hits < 8000))
                        || ((structure.structureType == STRUCTURE_CONTAINER) && (structure.hits < 150000))
                        || ((structure.structureType == STRUCTURE_EXTENSION || structure.structureType == STRUCTURE_SPAWN) && (structure.hits < structure.hitsMax))
                        )
                    }
                });
                if(damagedStructures) {
                    tower.repair(damagedStructures);
                }
            }
        }
    }
}

module.exports = config;