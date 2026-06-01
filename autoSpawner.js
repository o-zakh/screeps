var autoSpawner = {

    /** @param {StructureSpawn} creep **/
    run: function() {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == "harvester")
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == "upgrader")
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == "builder")

        const currentRoom = Game.spawns['Spawn1'].room

        if (harvesters.length < 1) {
            var name = "Harvester" + Game.time
            if (currentRoom.energyCapacityAvailable >= 400) {
                Game.spawns["Spawn1"].spawnCreep([WORK, WORK, MOVE, MOVE, CARRY, CARRY], name, {memory: {role: "harvester"}, direction: BOTTOM})
            } else {
                Game.spawns["Spawn1"].spawnCreep([WORK, MOVE, CARRY], name, {memory: {role: "harvester"}, direction: BOTTOM})
            }
        }

        if (upgraders.length < 3) {
            var name = "Upgrader" + Game.time
            if (currentRoom.energyCapacityAvailable >= 400) {
                Game.spawns["Spawn1"].spawnCreep([WORK, WORK, MOVE, MOVE, CARRY, CARRY], name, {memory: {role: "upgrader"}, direction: BOTTOM})
            } else {
                Game.spawns["Spawn1"].spawnCreep([WORK, MOVE, CARRY], name, {memory: {role: "upgrader"}, direction: BOTTOM})
            }
        }

        if (builders.length < 2) {
            var name = "Builder" + Game.time
            if (currentRoom.energyCapacityAvailable >= 400) {
                Game.spawns["Spawn1"].spawnCreep([WORK, WORK, MOVE, MOVE, CARRY, CARRY], name, {memory: {role: "builder"}, direction: BOTTOM})
            } else {
                Game.spawns["Spawn1"].spawnCreep([WORK, MOVE, CARRY], name, {memory: {role: "builder"}, direction: BOTTOM})
            }
        }
    }
};

module.exports = autoSpawner;