var config = require('config');

var autoSpawner = {

    /** @param {StructureSpawn} creep **/
    run: function() {
        

        // Логика подсчета крипов разных ролей:
//         var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == "harvester")
//         var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == "upgrader")
//         var builders = _.filter(Game.creeps, (creep) => creep.memory.role == "builder")

//         console.log(`harvesters: ${harvesters.length},
// upgraders: ${upgraders.length},
// builders: ${builders.length}`)

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
        }
    }
};

module.exports = autoSpawner;