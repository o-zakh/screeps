var config = require('config');

var roleDistCourier = {

    /** @param {Creep} creep **/
    /** @param {Creep} distHarvester **/
    run: function(creep, distHarvester) {
        
        const mainRoom = Game.spawns['Spawn1'].room;

        if (creep.store.getFreeCapacity() > 0) {
            if (distHarvester) {
                console.log("distHarv: " + distHarvester.name)
                creep.moveTo(distHarvester.pos, {visualizePathStyle: {stroke: '#ffffff'}});
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