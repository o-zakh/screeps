var config = {
    rcl: [
        {},
        {
            creepNumber: {
                harvesters: 4,
                upgraders: 2,
                builders: 2,
            },
            bodyParts: {
                harvesters: [WORK, MOVE, CARRY],
                upgraders: [WORK, MOVE, CARRY],
                builders: [WORK, MOVE, CARRY],
            },
            name: {
                harvesters: "Harvester" + Game.time,
                upgraders: "Upgrader" + Game.time,
                builders: "Builder" + Game.time,
            }
        },
        {
            creepNumber: {
                harvesters: 4,
                upgraders: 2,
                builders: 2,
            },
            bodyParts: {
                harvesters: [WORK, WORK, MOVE, MOVE, CARRY, CARRY],
                upgraders: [WORK, WORK, MOVE, MOVE, CARRY, CARRY],
                builders: [WORK, WORK, MOVE, MOVE, CARRY, CARRY],
            },
            name: {
                harvesters: "Harvester" + Game.time,
                upgraders: "Upgrader" + Game.time,
                builders: "Builder" + Game.time,
            }
        },
    ],
    constructionPositions: {
        extensions: [
            { x: 24, y: 23 },
            { x: 24, y: 25 },
            { x: 25, y: 24 },
            { x: 26, y: 23 },
            { x: 26, y: 25 },
        ],
        containers: [
            { x: 19, y: 17 },
        ],
    },
    sourceId: {
        builders: "c27787cafbad128b766a66e4",
    },
};

module.exports = config;
