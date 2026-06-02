var roleHarvester = require('dist/role.harvester');
var roleUpgrader = require('dist/role.upgrader');
var roleBuilder = require('dist/role.builder');
var autoSpawner = require('dist/autoSpawner');
var tower = require('dist/tower');

module.exports.loop = function () {
    console.log('Lorem Ipsum');

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    autoSpawner.run();
    tower1 = Game.getObjectById("6a1edde4929c4fc9984d2cec")
    tower.defend(tower1)

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.ticksToLive < 100 && creep.store.getUsedCapacity() == 0) {
            creep.suicide()
        }
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