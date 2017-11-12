var role = {
    run: function(creep) {
        var enemies = creep.room.find(FIND_HOSTILE_CREEPS);
        if(creep.room.name == "E89S26") {
            var spawn = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType == STRUCTURE_SPAWN}});
            var extension = creep.room.find(FIND_STRUCTURES, {filter: (structure) => {return structure.structureType == STRUCTURE_EXTENSION}});
            if(spawn.length) {
                if(creep.attack(spawn[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(spawn[0]);
                }
            } else if(extension.length) {
                if(creep.attack(extension[0]) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(extension[0]);
                }
            }
        } else if(enemies.length) {
            if(creep.attack(enemies[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(enemies[0]);
            }
        } else {
            var exit;
            if(creep.room.name == "E88S26") {
                exit = creep.room.find(FIND_EXIT_BOTTOM);
            } else if(creep.room.name == "E88S27") {
                exit = creep.room.find(FIND_EXIT_RIGHT);
            } else if(creep.room.name == "E89S27") {
                exit = creep.room.find(FIND_EXIT_TOP);
            }
            creep.moveTo(exit[12]);
        }
    }
}

module.exports = role;