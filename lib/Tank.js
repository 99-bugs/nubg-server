var Point = require('./point');

class Tank {

  constructor(name, driver) {
    this.name = name;
    this.driver = driver;
    this.location = new Point(0, 0);
    this.hp = 100;
    this.model = "Chaffee"
  }

  move(x, y) {
    this.location = new Point(x, y);
  }

}

module.exports = Tank;