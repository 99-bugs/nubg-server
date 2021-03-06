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
  }

  drive(distance) {
    this.location.x += distance * Math.cos(this.angleFromDirection());
    this.location.y += distance * Math.sin(this.angleFromDirection());
  }

  turn(rotation) {
    this.direction += rotation;
    while(this.direction < 0) {this.direction += 360;}
    this.direction = this.direction % 360;
  }

  angleFromDirection() {
    return (this.direction - 90) / (180 / Math.PI)
  }

  getState() {
    return {
      id: this.id,
      name: this.name,
      location: this.location,
      direction: this.direction,
      health: this.hp,
    }
  }

}

module.exports = Tank;