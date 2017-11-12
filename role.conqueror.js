var role = {
    run: function(creep) {
        if(creep.room.name == "W3N5") {
            creep.moveTo(creep.room.controller);
            creep.claimController(creep.room.controller);
        } else {
            var exit = creep.pos.findClosestByPath(FIND_EXIT_LEFT);
            creep.moveTo(exit[10]);
        }
    }
}
module.exports = role;