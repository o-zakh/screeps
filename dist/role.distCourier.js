var config = require('config');

var roleDistCourier = {

    /** @param {Creep} creep **/
    /** @param {Creep} distHarvester **/
    run: function(creep, distHarvester) {
        const mainRoom = Game.spawns['Spawn1'].room;

        if (creep.memory.pickup && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.pickup = false;
            if (distHarvester) {
                creep.moveTo(distHarvester.pos, {visualizePathStyle: {stroke: '#ffffff'}});
            }
            return;
        }

        if (!creep.memory.pickup && creep.store.getFreeCapacity() == 0) {
            creep.memory.pickup = true;
            const containers = mainRoom.find(FIND_STRUCTURES, {
                filter: (structure) => structure.structureType == STRUCTURE_CONTAINER && structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
            });
            const target = creep.pos.findClosestByPath(containers);
            if (target) {
                creep.moveTo(target, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
    }
};

module.exports = roleDistCourier;