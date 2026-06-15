var config = require('config');

var autoSpawner = {

    /** @param {Object} creepsObj **/
    run: function(creepsObj) {
        
//         console.log(`harvesters: ${creepsObj.harvesters.length},
// upgraders: ${creepsObj.upgraders.length},
// builders: ${creepsObj.builders.length},
// distHarvesters: ${creepsObj.distHarvesters.length},
// distCouriers: ${creepsObj.distCouriers.length}`)

        const currentRoom = Game.spawns['Spawn1'].room;
        const rclLevel = currentRoom.controller.level;
        const rclConfig = config.rcl[rclLevel] || config.rcl.at(-1)

        // Носят ресурсы до: 1. Спавнера и экстеншенов 2. Контейнеров
        if (creepsObj.harvesters.length < rclConfig.creepNumber.harvesters) {
            var name = rclConfig.name.harvesters + Game.time
            var bodyParts = rclConfig.bodyParts.harvesters
            if (Game.spawns["Spawn1"].spawnCreep(bodyParts, name, {memory: {role: "harvester"}}) == ERR_NOT_ENOUGH_ENERGY) {
                bodyParts = [WORK, MOVE, CARRY]
                Game.spawns["Spawn1"].spawnCreep(bodyParts, name, {memory: {role: "harvester"}})
            }
        }

        // Апгрейдеров меньше, потому что они преимущественно будут только носить ресурсы от контейнера до контроллера
        else if (creepsObj.upgraders.length < rclConfig.creepNumber.upgraders) {
            var name = rclConfig.name.upgraders + Game.time
            var bodyParts = rclConfig.bodyParts.upgraders
            Game.spawns["Spawn1"].spawnCreep(bodyParts, name, {memory: {role: "upgrader"}})
            // if (Game.spawns["Spawn1"].spawnCreep(bodyParts, name, {memory: {role: "upgrader"}}) == ERR_NOT_ENOUGH_ENERGY) {
            //     bodyParts = [WORK, MOVE, CARRY]
            //     Game.spawns["Spawn1"].spawnCreep(bodyParts, name, {memory: {role: "upgrader"}})
            // }
        }

        // Столько, сколько ячеек во втором сурсе
        else if (creepsObj.builders.length < rclConfig.creepNumber.builders) {
            var name = rclConfig.name.builders + Game.time
            var bodyParts = rclConfig.bodyParts.builders
            if (Game.spawns["Spawn1"].spawnCreep(bodyParts, name, {memory: {role: "builder"}}) == ERR_NOT_ENOUGH_ENERGY) {
                bodyParts = [WORK, MOVE, CARRY]
                Game.spawns["Spawn1"].spawnCreep(bodyParts, name, {memory: {role: "builder"}})
            }
        }
        else if (creepsObj.distHarvesters.length < rclConfig.creepNumber.distHarvesters) {
            var name = rclConfig.name.distHarvesters + Game.time
            var bodyParts = rclConfig.bodyParts.distHarvesters
            Game.spawns["Spawn1"].spawnCreep(bodyParts, name, {memory: {role: "distHarvester"}})
        }

        else if (creepsObj.distCouriers.length < rclConfig.creepNumber.distCouriers) {
            var name = rclConfig.name.distCouriers + Game.time
            var bodyParts = rclConfig.bodyParts.distCouriers
            Game.spawns["Spawn1"].spawnCreep(bodyParts, name, {memory: {role: "distCourier"}})
        }
    }
};

module.exports = autoSpawner;