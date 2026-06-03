var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var autoSpawner = require('autoSpawner');
var tower = require('tower');
var сonfig = require('config');

module.exports.loop = function () {
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    const mainRoom = Game.spawns['Spawn1'].room
    
    
    var structureTypes = {
        extensions: STRUCTURE_EXTENSION,
        containers: STRUCTURE_CONTAINER,
    };

    for (var type in сonfig.constructionPositions) {
        var positions = сonfig.constructionPositions[type];
        if (!Array.isArray(positions)) {
            continue;
        }

        var structureType = structureTypes[type] || STRUCTURE_EXTENSION;
        positions.forEach(function(pos) {
            var position = mainRoom.getPositionAt(pos.x, pos.y);
            if (position) {
                position.createConstructionSite(structureType);
            }
        });
    }

    autoSpawner.run();
    // tower1 = Game.getObjectById("6a1edde4929c4fc9984d2cec")
    // tower.defend(tower1)

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