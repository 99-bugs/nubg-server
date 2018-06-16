class Game {

  constructor() {
    this.tanks = []
    this.size = { width: 800, height: 600 };
  }

  spawn_tank(newTank) {
    for (let tank of this.tanks) {
      if (tank.driver.nickname === newTank.driver.nickname) {
        return;
      }
    }
    // Later we will need to take size of tank into account too
    newTank.move(Math.floor(Math.random() * (this.size.width-1)), Math.floor(Math.random() * (this.size.height-1)));
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