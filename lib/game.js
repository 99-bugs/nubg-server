// Game creates mqtt service and listens for requests to setup new match instance
// Then spawns new match
// Also listens for players that want to join a match

class Game {

    constructor() {
        this.matches = [];
    }

};

module.exports = Game;