var config = require('config');

var roleBuilder = {

    /** @param {Creep} creep **/
    run: function(creep) {

		const builderEnergySourceId = config.sourceId.builders

		// roleBuilder.repairWalls(creep)

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
				var repairTargets = _.filter(creep.room.find(FIND_STRUCTURES), (structure) => {
					return (structure.hits <= 300000 && structure.hitsMax - structure.hits > 500 && structure.structureType != STRUCTURE_WALL)
				})
				if (repairTargets.length != 0) {
					repairTarget = creep.pos.findClosestByPath(repairTargets, {algorithm: 'dijkstra'});
					if(creep.repair(repairTarget) == ERR_NOT_IN_RANGE) {
						creep.moveTo(repairTarget, {visualizePathStyle: {stroke: '#ffffff'}});
					}
				} else {
					roleBuilder.repairWalls(creep)
				}
			}
	    }
	    else {
	       var source = Game.getObjectById(builderEnergySourceId)
            if(creep.harvest(source) == ERR_NOT_IN_RANGE) {
                creep.moveTo(source, {visualizePathStyle: {stroke: '#ffaa00'}});
            }
	    }
	},
	repairWalls: function(creep) {
		if (!creep.memory.wallRepairTarget) {
			const repairTargets = _.filter(creep.room.find(FIND_STRUCTURES), (structure) => {
				return (structure.structureType == STRUCTURE_WALL)
			})
			console.log("All walls that need repair: " + repairTargets)
			const repairTargetsSorted = _.sortBy(repairTargets, (structure) => structure.hits)
			console.log("Sorted repair targets: " + repairTargetsSorted)
			const closestRepairTarget = creep.pos.findClosestByPath(repairTargets, {
				filter: function(structure) {
					return structure.hits == repairTargetsSorted[0].hits
				}
			})
			console.log("Closest wall that needs repair: " + closestRepairTarget)
			console.log("Its ID: " + closestRepairTarget.id)
			creep.memory.wallRepairTarget = {
				id: null,
				repairedHits: 0
			}
			creep.memory.wallRepairTarget.id = closestRepairTarget.id
			creep.memory.wallRepairTarget.repairedHits = 0
		}
		const wallRepairTarget = Game.getObjectById(creep.memory.wallRepairTarget.id)
		if(creep.repair(wallRepairTarget) == ERR_NOT_IN_RANGE) {
			creep.moveTo(wallRepairTarget, {visualizePathStyle: {stroke: '#ffffff'}});
		} else {
			creep.memory.wallRepairTarget.repairedHits += 200
		}
		if (creep.memory.wallRepairTarget.repairedHits >= 10000) {
			delete creep.memory.wallRepairTarget
			return 
		}
	}
};

module.exports = roleBuilder;