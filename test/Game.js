let assert = require('assert');
let Game = require('../lib/Game');

describe('Game', () => {
    describe('name property', () => {
        it('has a name', () => {
            let name = "gamename";
            let game = new Game({name: name});
            assert.equal(game.name, name);
        });
        it('has a default name when no name is specified', () => {
            let game = new Game();
            assert.equal(game.name, "default game");
        });
        it('should return the name in the gamestate object', () => {
            let name = 'game state name';
            let game = new Game({name: name});
            assert.equal(game.game_state().name, name);
        })
    });
});