var structureTower = {

    /** @param {StructureTower} tower **/
    defend: function(tower) {
        const hostiles = tower.room.find(FIND_HOSTILE_CREEPS)
        if (hostiles) {
            closestHostile = tower.pos.findClosestByRange(hostiles)
            if (!closestHostile) {
            } else {
                console.log("Стреляю по " + closestHostile)
            }
            tower.attack(closestHostile)            
        }
    }
}

module.exports = structureTower;