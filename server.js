var Tank = require('./lib/tank');
var Player = require('./lib/player');
var Game = require('./lib/match');

var bio = new Player("BioBoost");
var littletank = new Tank("My Little Tank", bio);

var sille = new Player("LittleWAN");
var duke = new Tank("Tha DUKE", sille);

console.log(littletank);
console.log(duke);

var game = new Game();
console.log(game);

