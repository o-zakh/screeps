var config = require('config');

var roleDistHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {
        if (creep.room == Game.spawns['Spawn1'].room) {
            const exitDir = creep.room.findExitTo("E23N13")
            creep.moveTo(creep.pos.findClosestByRange(exitDir), {visualizePathStyle: {stroke: '#ffffff'}})
        } else {
            const targetSource = Game.getObjectById(config.sourceId.distHarvester)
            if (creep.store.getFreeCapacity() > 0) {
                if(creep.harvest(targetSource) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targetSource, {visualizePathStyle: {stroke: '#ffaa00'}});
                }
            }
            var myAdjCreeps = creep.room.find(FIND_MY_CREEPS, {
                filter: (myCreep) => {
                    return (creep.pos.inRangeTo(myCreep, 1) && myCreep.memory.role == "distCourier")
                }
            })
            if(creep.store.getUsedCapacity() > 0 && myAdjCreeps.length > 0) {
                var err = creep.transfer(myAdjCreeps[0], RESOURCE_ENERGY)
                // console.log(err + myAdjCreeps[0])
            }
        }
	}
};

module.exports = roleDistHarvester;