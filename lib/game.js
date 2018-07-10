class Game {

  constructor(options) {
    let defaults = {
      name: "default game"
    }
    options = Object.assign(defaults, options);
    this.name = options.name
    this.tanks = []
    this.size = { width: 800, height: 600 };
  }

  game_state() {
    return {
      name: this.name,
      tanks: this.tanks,
      size: this.size
    };
  }

};

module.exports = Game;