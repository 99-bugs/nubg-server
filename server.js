var winston = require('winston');
const logger = winston.createLogger({
  transports: [
    new winston.transports.Console()
    // new winston.transports.File({ filename: 'combined.log' })
  ], level: 'debug'
});

var Tank = require('./lib/tank');
var Player = require('./lib/player');
var Game = require('./lib/game');

var bio = new Player("BioBoost");
var littletank = new Tank("My Little Tank", bio);

var sille = new Player("LittleWAN");
var duke = new Tank("Tha DUKE", sille);

console.log(littletank);
console.log(duke);

var game = new Game();
console.log(game);

var mqtt = require('mqtt');
var client = mqtt.connect("tcp://mqtt.labict.be:1883");
 
client.on('connect', function () {
  logger.info("Connected to broker");
  client.subscribe('test/nubg/general');
  client.publish('test/nubg/gamestate', JSON.stringify({msg: "imagine this to be game state"}));
});
 
client.on('message', function (topic, message) {
  logger.debug("Received mqtt message '" + message.toString() + "' @" + topic);
  console.log(message.toString());
  client.end();
});


// game.stop();
