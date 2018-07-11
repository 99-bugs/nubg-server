let TankManager = require('./TankManager');

class Game {

  constructor(options) {
    let defaults = {
      name: "default game"
    }
    options = Object.assign(defaults, options);
    this.name = options.name
    this.tankManager = new TankManager();
    // this.size = { width: 800, height: 600 };
  }

  getState() {
    return {
      name: this.name,
      tanks: this.tankManager.getState(),
      timestamp: Date.now(),
      // size: this.size
    };
  }

};

module.exports = Game;