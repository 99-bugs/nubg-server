var Tank = require('../Tank');

class TankFactory {

  static from_json(jsonString) {
    let obj = JSON.parse(jsonString);
    // TODO: random location should be based on the game settings (map size)
    let tank = new Tank(obj.name, { location: { x: (Math.random() * 700) + 50 , y: (Math.random() * 500) + 50}, direction: (Math.random() * 360) % 45 });
    return tank;
  }

}

module.exports = TankFactory;
