const { filter, sortedIndexBy } = require("lodash");

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }

	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        else {
            
            var sources = creep.room.find(FIND_STRUCTURES, {
                    filter: (structure) => {
                        return (structure.structureType == STRUCTURE_CONTAINER) &&
                            structure.store.getUsedCapacity(RESOURCE_ENERGY) > 0;
                    }
            });

            sources = sources.concat(creep.room.find(FIND_SOURCES_ACTIVE))
            
            var closestSource = creep.pos.findClosestByPath(sources, {algorithm: "dijkstra"});
            
            var nearSource

            if (closestSource.structureType == STRUCTURE_CONTAINER) {
                nearSource = creep.withdraw(closestSource, RESOURCE_ENERGY)
            } else {
                nearSource = creep.harvest(closestSource)
            }

            if (nearSource == ERR_NOT_IN_RANGE) {
                creep.moveTo(closestSource, {visualizePathStyle: {stroke: '#ffaa00'}})
            }
        }
	}
};

module.exports = roleUpgrader;