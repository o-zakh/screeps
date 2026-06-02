var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

		const builderEnergySourceId = "5bbcac359099fc012e6351a1"

	    if(creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.building = false;
            creep.say('🔄 harvest');
	    }
	    if(!creep.memory.building && creep.store.getFreeCapacity() == 0) {
	        creep.memory.building = true;
	        creep.say('🚧 build');
	    }

	    if(creep.memory.building) {
	        var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			if (targets.length != 0) {
				if (targets.some(target => target.structureType == "extension")) {
					targets = _.filter(targets, (construction) => construction.structureType == STRUCTURE_EXTENSION)
				}
				targets = creep.pos.findClosestByPath(targets, {algorithm: 'dijkstra'});

				if(targets) {
					if(creep.build(targets) == ERR_NOT_IN_RANGE) {
						creep.moveTo(targets, {visualizePathStyle: {stroke: '#ffffff'}});
					}
				}
			} else {
				var repairTargets = _.filter(creep.room.find(FIND_STRUCTURES), (structure) => structure.hitsMax - structure.hits > 500)
				repairTarget = creep.pos.findClosestByPath(repairTargets, {algorithm: 'dijkstra'});
				if(creep.repair(repairTarget) == ERR_NOT_IN_RANGE) {
					creep.moveTo(repairTarget, {visualizePathStyle: {stroke: '#ffffff'}});
				}
			}
	    }
	    else {
	       var source = Game.getObjectById(builderEnergySourceId)
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	}
};

module.exports = roleBuilder;