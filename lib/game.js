class Game {

    constructor() {
        this.tanks = []
        this.size = { width: 800, height: 600 };
    }

    add_tank(tank) {
        this.tanks.push(tank);
    }

    game_state() {
        return JSON.stringify({
            tanks: this.tanks,
            size: this.size
        });
    }

};

module.exports = Game;