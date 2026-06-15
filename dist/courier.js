var config = require('config');

var roleDistCourier = {

    /** @param {Creep} creep **/
    /** @param {Array} distHarvesters **/
    run: function(creep, distHarvesters) {
        
        const mainRoom = Game.spawns['Spawn1'].room;

        if (creep.store.getFreeCapacity() > 0) {
            if (distHarvesters[0]) {
                if (distHarvesters[0].room != mainRoom) {
                    creep.moveTo(distHarvesters[0].pos, {visualizePathStyle: {stroke: '#ffffff'}});
                }
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