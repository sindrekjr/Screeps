var roads = require("plan.roads");

module.exports = {
    run: function(id) {
    
        roads.planRoads(id.room);
        
        let spawn = id.room.find(FIND_STRUCTURES, { filter: (structure) => structure.structureType == STRUCTURE_SPAWN });
        if(spawn.hits < 2500) {
            id.activateSafeMode();
        }
    }
}
