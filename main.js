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
        builders: { amount: 3, body: [WORK,WORK,CARRY,MOVE] },
        harvesters: { amount: 4, body: [WORK,WORK,CARRY,MOVE] },
        upgraders: { amount: 4, body: [WORK,WORK,CARRY,CARRY,MOVE,MOVE] },
        couriers: { amount: 1, body: [CARRY,CARRY,MOVE,MOVE] },
        protectors: { amount: 0, body: [TOUGH,TOUGH,TOUGH,MOVE,ATTACK,MOVE,ATTACK,ATTACK,ATTACK,MOVE] },
        conquerors: { amount: 0, body: [CLAIM,MOVE] }
    }
};

spawn.run = spawn.run.bind({sp : spawnProtocol});

module.exports.loop = function() {
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
