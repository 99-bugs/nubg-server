var Tank = require('../Tank');

class TankFactory {

  static from_json(jsonString) {
    let obj = JSON.parse(jsonString);
    let tank = new Tank(obj.name);
    return tank;
  }

}

module.exports = TankFactory;