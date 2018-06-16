var Tank = require('../tank');
var Player = require('../player');

class TankFactory {
    static from_json(jsonString) {
        let obj = JSON.parse(jsonString);
        let player = new Player(obj.player.nickname);
        let tank = new Tank(obj.tank.name, player);
        return tank;
    }
}

module.exports = TankFactory;