var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var autoSpawner = require('autoSpawner');
var structureTower = require('structure.tower');
var roleDistHarvester = require('role.distHarvester')
var roleDistCourier = require('role.distCourier')
var config = require('config');

module.exports.loop = function () {
    
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    
    creepsObj = {
        harvesters: _.filter(Game.creeps, (creep) => creep.memory.role == "harvester"),
        upgraders: _.filter(Game.creeps, (creep) => creep.memory.role == "upgrader"),
        builders: _.filter(Game.creeps, (creep) => creep.memory.role == "builder"),
        distHarvesters: _.filter(Game.creeps, (creep) => creep.memory.role == "distHarvester"),
        distCouriers: _.filter(Game.creeps, (creep) => creep.memory.role == "distCourier"),
    }

    const mainRoom = Game.spawns['Spawn1'].room
    
    var structureTypes = {
        extensions: STRUCTURE_EXTENSION,
        containers: STRUCTURE_CONTAINER,
        towers: STRUCTURE_TOWER,
    };

    for (var type in config.constructionPositions) {
        var positions = config.constructionPositions[type];
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

    autoSpawner.run(creepsObj);

    var towers = _.filter(Game.structures, (structure) => structure.structureType == STRUCTURE_TOWER)

    if (towers.length > 0) {
        for(var tower in towers) {
            structureTower.defend(tower)
        }
    }


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
        if(creep.memory.role == 'distHarvester') {
            roleDistHarvester.run(creep);
        }
        if(creep.memory.role == 'distCourier') {
            roleDistCourier.run(creep, creepsObj.distHarvesters[0]);
        }
    }
}