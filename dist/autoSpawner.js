var autoSpawner = {

    /** @param {StructureSpawn} creep **/
    run: function() {
        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == "harvester")
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == "upgrader")
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == "builder")

//         console.log(`harvesters: ${harvesters.length},
// upgraders: ${upgraders.length},
// builders: ${builders.length}`)

        const currentRoom = Game.spawns['Spawn1'].room
        
        let bodyParts = [WORK, MOVE, CARRY]
        
        if (currentRoom.energyCapacityAvailable >= 400) {
            bodyParts = [WORK, WORK, MOVE, MOVE, CARRY, CARRY]
        }

        // Носят ресурсы до: 1. Спавнера и экстеншенов 2. Контейнеров
        if (harvesters.length < 5) {
            if (currentRoom.energyAvailable >= 600) {
                bodyParts = [WORK, WORK, WORK, MOVE, MOVE, MOVE, CARRY, CARRY, CARRY]
            }
            var name = "Harvester" + Game.time
            Game.spawns["Spawn1"].spawnCreep(bodyParts, name, {memory: {role: "harvester"}})
        }

        // Апгрейдеров меньше, потому что они преимущественно будут только носить ресурсы от контейнера до контроллера
        if (upgraders.length < 4
             && currentRoom.energyCapacityAvailable >= 700) {
            if (currentRoom.energyCapacityAvailable >= 650) {
                bodyParts = [WORK, MOVE, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY]
            }
            var name = "Upgrader" + Game.time
            Game.spawns["Spawn1"].spawnCreep(bodyParts, name, {memory: {role: "upgrader"}})
        }

        // Столько, сколько ячеек во втором сурсе
        if (builders.length < 4) {
            var name = "Builder" + Game.time
            Game.spawns["Spawn1"].spawnCreep(bodyParts, name, {memory: {role: "builder"}})
        }
    }
};

module.exports = autoSpawner;