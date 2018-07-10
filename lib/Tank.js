var Point = require('./point');
var sha1 = require('sha1');

class Tank {

  constructor(name, options = {}) {
    let defaults = {
      location: {x: 0, y:0}, 
      direction: 0
    }
    options = Object.assign(defaults, options);
    this.name = name;
    this.id = sha1(this.name);
    this.location = options.location;
    this.direction = options.direction;
    this.hp = 100;
    this.model = "Chaffee"
  }

  move(x, y) {
    this.location = new Point(x, y);
  }

}

module.exports = Tank;