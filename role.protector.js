var role = {
    run: function(creep) {
        var enemies = creep.room.find(FIND_HOSTILE_CREEPS);
        if(enemies.length > 0) {
            if(creep.attack(enemies[0]) == ERR_NOT_IN_RANGE) {
                creep.moveTo(enemies[0]);
            } else {
                creep.attack(enemies[0]);
            }
        } else {
            creep.moveTo(Game.flags["Guardpost" + creep.memory.post]);
        }
    }
}

function posts(creep) {
    var protectors = _.filter(Game.creeps, (other) => {return ((other.memory.role == "protector") && (other.memory.post == 1))});
    if(protectors.length == 0) {
        creep.memory.post = 1;
    } else {
        creep.memory.post = 2;
    }
}

module.exports = role;