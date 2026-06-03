var config = {
    rcl: [
        {},
        {
            creepNumber: {
                harvesters: 4,
                upgraders: 2,
                builders: 5,
                distHarvesters: 0,
                distCouriers: 0,
            },
            bodyParts: {
                harvesters: [WORK, MOVE, CARRY],
                upgraders: [WORK, MOVE, CARRY],
                builders: [WORK, MOVE, CARRY],
                distHarvesters: [],
                distCouriers: [],
            },
            name: {
                harvesters: "Harvester",
                upgraders: "Upgrader",
                builders: "Builder",
                distHarvesters: "DistHarvester",
                distCouriers: "DistCourier",
            }
        },
        {
            creepNumber: {
                harvesters: 4,
                upgraders: 4,
                builders: 4,
                distHarvesters: 1,
                distCouriers: 1,
            },
            bodyParts: {
                harvesters: [WORK, WORK, MOVE, MOVE, CARRY, CARRY],
                upgraders: [WORK, WORK, MOVE, MOVE, CARRY, CARRY],
                builders: [WORK, WORK, MOVE, MOVE, CARRY, CARRY],
                distHarvesters: [WORK, MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
                distCouriers: [MOVE, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY],
            },
            name: {
                harvesters: "Harvester",
                upgraders: "Upgrader",
                builders: "Builder",
                distHarvesters: "DistHarvester",
                distCouriers: "DistCourier",
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
            { x: 8, y: 20 },
            { x: 7, y: 19 },
            { x: 6, y: 19 },
            { x: 5, y: 19 },
            { x: 4, y: 20 },
            { x: 3, y: 21 },
            { x: 4, y: 22 },
            { x: 5, y: 22 },
        ],
        containers: [
            { x: 19, y: 17 },
        ],
        towers: [
            { x: 20, y: 27},
        ]
    },
    sourceId: {
        distHarvester: "6a1c371fd05a7c237d18d3ef",
        builders: "6a1c371fd05a7c237d18d3f3",
    },
};

module.exports = config;
