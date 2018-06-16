class Game {

  constructor() {
    this.tanks = []
    this.size = { width: 800, height: 600 };
  }

  add_tank(newTank) {
    for (let tank of this.tanks) {
      if (tank.driver.nickname === newTank.driver.nickname) {
        return;
      }
    }
    this.tanks.push(newTank);
  }

  game_state() {
    return JSON.stringify({
      tanks: this.tanks,
      size: this.size
    });
  }

};

module.exports = Game;