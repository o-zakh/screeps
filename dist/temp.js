var config = require('config');

var roleDistCourier = {

    /** @param {Creep} creep **/
    /** @param {Array} distHarvesters **/
    run: function(creep, distHarvesters) {
        
        const mainRoom = Game.spawns['Spawn1'].room;
        
        var tombstones = creep.room.find(FIND_TOMBSTONES)
        droppedEnergy = tombstones.concat(creep.room.find(FIND_DROPPED_RESOURCES))
        
        
        if (creep.store.getFreeCapacity() > 0) {
            if (droppedEnergy.length > 0) {
                const drop = creep.pos.findClosestByPath(droppedEnergy)
                creep.say("🪎")
                if (creep.withdraw(drop) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
            else if (distHarvesters) {
                creep.moveTo(distHarvesters[0].pos, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        } else {
            const containers = mainRoom.find(FIND_STRUCTURES, {
                filter: (structure) => structure.structureType == STRUCTURE_CONTAINER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });
            const target = creep.pos.findClosestByPath(containers);
            if (target) {
                if (creep.transfer(target, RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
                }
            } else {
                creep.moveTo(Game.spawns['Spawn1'].pos)
            }
        }
    }
};

module.exports = roleDistCourier;