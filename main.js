"use strict";

const builder = require("role.builder"),
    conqueror = require("role.conqueror"),
    courier = require("role.courier"),
    harvester = require("role.harvester"),
    protector = require("role.protector"),
    raider = require("role.raider"),
    upgrader = require("role.upgrader");

const spawn = require("structure.spawns"),
    controllers = require("structure.controllers"),
    towers = require("structure.towers");
    
const spawnProtocol = {
    "Spawn1": {
        builders: { amount: 3, body: [WORK,WORK,WORK,CARRY,CARRY,MOVE] },
        harvesters: { amount: 4, body: [WORK,WORK,CARRY,MOVE] },
        upgraders: { amount: 6, body: [WORK,WORK,CARRY,CARRY,MOVE,MOVE] },
        couriers: { amount: 2, body: [CARRY,CARRY,MOVE,MOVE] },
        protectors: { amount: 1, body: [TOUGH,TOUGH,TOUGH,MOVE,ATTACK,MOVE,ATTACK,ATTACK,ATTACK,MOVE] },
        conquerors: { amount: 0, body: [MOVE,CLAIM] }
    },
    "Spawn2": {
        builders: { amount: 1, body: [WORK,CARRY,MOVE] },
        harvesters: { amount: 2, body: [WORK,CARRY,MOVE] },
        upgraders: { amount: 1, body: [WORK,CARRY,MOVE,MOVE] },
        couriers: { amount: 0, body: [CARRY,CARRY,MOVE,MOVE] },
        protectors: { amount: 0, body: [TOUGH,TOUGH,TOUGH,MOVE,ATTACK,MOVE,ATTACK,ATTACK,ATTACK,MOVE] },
        conquerors: { amount: 0, body: [MOVE,CLAIM] }
    }
};

spawn.run = spawn.run.bind({sp : spawnProtocol});

module.exports.loop = function() {
    
    for(var name in Game.rooms) {
        console.log("Room '" + name + "' has " + Game.rooms[name].energyAvailable + " energy.");
        /*for(var id in Game.rooms[name].spawns) {
            spawn.run(Game.spawns[id]);
        }*/
        
        //for(var id in Game.rooms[name].structures)
        
        //for(var s in r.spawns) spawn.run(s);
        //controllers.run(r.controller);
    }
    
    for(var id in Game.spawns) {
        this.spawn = Game.spawns[id];
        spawn.run(this.spawn);
    }
    
    for(var id in Game.controller) {
        controllers.run(id);
    }
    
    towers.run();

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            console.log("Clearing dead creep from memory: " + name);
            delete Memory.creeps[name];
        }
    }
    
    let h = 0;
    for(var name in Game.creeps) {
        let creep = Game.creeps[name];
        
        switch(creep.memory.role) {
            case "builder":
                builder.run(creep);
                break;
            case "conqueror": 
                conqueror.run(creep);
                break;
            case "courier":
                courier.run(creep);
                break;
            case "harvester":
                h++;
                if((h % 2) === 0 || (creep.room.find(FIND_SOURCES).length === 1)) creep.memory.target = 0;
                else creep.memory.target = 1;
                harvester.run(creep);
                break;
            case "protector":
                protector.run(creep);
                break;
            case "raider":
                raider.run(creep);
                break;
            case "upgrader":
                upgrader.run(creep);
                break;
            default:
                harvester.run(creep);
        }
    }
}
