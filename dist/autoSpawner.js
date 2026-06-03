var config = require('config');
const { rcl } = require('./config');

var autoSpawner = {

    /** @param {StructureSpawn} creep **/
    run: function() {
        

        // Логика подсчета крипов разных ролей:

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == "harvester")
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == "upgrader")
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == "builder")

        const creeps = [harvesters, upgraders, builders]

        console.log(`harvesters: ${harvesters.length},
upgraders: ${upgraders.length},
builders: ${builders.length}`)

        const currentRoom = Game.spawns['Spawn1'].room;
        const rclLevel = currentRoom.controller.level;
        const rclConfig = config.rcl[rclLevel] || config.rcl.at(-1)

        // Носят ресурсы до: 1. Спавнера и экстеншенов 2. Контейнеров
        if (harvesters.length < rclConfig.creepNumber.harvesters) {
            var name = rclConfig.name.harvesters
            const bodyParts = rclConfig.bodyParts.harvesters
            Game.spawns["Spawn1"].spawnCreep(bodyParts, name, {memory: {role: "harvester"}})
        }

        // Апгрейдеров меньше, потому что они преимущественно будут только носить ресурсы от контейнера до контроллера
        else if (upgraders.length < rclConfig.creepNumber.upgraders) {
            var name = rclConfig.name.upgraders
            const bodyParts = rclConfig.bodyParts.upgraders
            Game.spawns["Spawn1"].spawnCreep(bodyParts, name, {memory: {role: "upgrader"}})
        }

        // Столько, сколько ячеек во втором сурсе
        else if (builders.length < rclConfig.creepNumber.builders) {
            var name = rclConfig.name.builders
            const bodyParts = rclConfig.bodyParts.builders
            Game.spawns["Spawn1"].spawnCreep(bodyParts, name, {memory: {role: "builder"}})
        }
    }
};

module.exports = autoSpawner;