var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');

module.exports.loop = function () {
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == "harvester")
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == "upgrader")
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == "builder")

    if (harvesters.length < 1) {
        var name = "Harvester" + Game.time
        Game.spawns["Spawn1"].spawnCreep([WORK, MOVE, CARRY], name, {memory: {role: "harvester"}, direction: BOTTOM})
    }

    if (upgraders.length < 3) {
        var name = "Upgrader" + Game.time
        Game.spawns["Spawn1"].spawnCreep([WORK, MOVE, CARRY], name, {memory: {role: "upgrader"}, direction: BOTTOM})
    }

    if (builders.length < 2) {
        var name = "Builder" + Game.time
        Game.spawns["Spawn1"].spawnCreep([WORK, MOVE, CARRY], name, {memory: {role: "builder"}, direction: BOTTOM})
    }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }
}