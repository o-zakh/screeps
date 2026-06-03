var config = require('config');
<<<<<<< HEAD
const { rcl } = require('./config');
=======
>>>>>>> 3baf02d8989490dad38d80f38a22a15ca230d59a

var autoSpawner = {

    /** @param {StructureSpawn} creep **/
    run: function() {
        

        // Логика подсчета крипов разных ролей:
<<<<<<< HEAD

        var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == "harvester")
        var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == "upgrader")
        var builders = _.filter(Game.creeps, (creep) => creep.memory.role == "builder")
=======
//         var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == "harvester")
//         var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == "upgrader")
//         var builders = _.filter(Game.creeps, (creep) => creep.memory.role == "builder")
>>>>>>> 3baf02d8989490dad38d80f38a22a15ca230d59a

        const creeps = [harvesters, upgraders, builders]

<<<<<<< HEAD
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
=======
        var currentRoom = Game.spawns['Spawn1'].room;
        var rclLevel = currentRoom.controller.level;
        var rclConfig = config.rcl[rclLevel] || config.rcl.at(-1)

        if (Game.spawns['Spawn1'].spawning) {
            return;
        }

        // Проверяем роли в строгом порядке приоритета
        var roleConfigs = [
            {key: 'harvesters', singular: 'harvester'},
            {key: 'upgraders', singular: 'upgrader'},
            {key: 'builders', singular: 'builder'}
        ];

        for (var i = 0; i < roleConfigs.length; i++) {
            var roleConfig = roleConfigs[i];
            var currentCount = 0;
            var roleCreeps = [];
            
            // Подсчитываем крипов только с нужной ролью
            for (var name in Game.creeps) {
                if (Game.creeps[name].memory.role === roleConfig.singular) {
                    currentCount++;
                    roleCreeps.push(Game.creeps[name]);
                }
            }
            
            var targetCount = rclConfig.creepNumber[roleConfig.key];
            
            
            if (currentCount < targetCount) {
                var bodyParts = rclConfig.bodyParts[roleConfig.key] || [WORK, MOVE, CARRY];
                var name = rclConfig.name[roleConfig.key] || roleConfig.singular.charAt(0).toUpperCase() + roleConfig.singular.slice(1) + Game.time;
                Game.spawns['Spawn1'].spawnCreep(bodyParts, name, {memory: {role: roleConfig.singular}});
                return;
            }
>>>>>>> 3baf02d8989490dad38d80f38a22a15ca230d59a
        }
    }
};

module.exports = autoSpawner;