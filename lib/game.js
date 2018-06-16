class Game {

    constructor() {
        this.tanks = []
        this.size = { width: 800, height: 600 };
    }

    add_tank(tank) {
        this.tanks.push(tank);
    }

};

module.exports = Game;