var winston = require('winston');

const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
 
const myFormat = printf(info => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});
 
const logger = winston.createLogger({
  format: combine(
    timestamp(),
    myFormat
  ),
  transports: [
    new winston.transports.Console()
  ], level: 'debug'
});

var Tank = require('./lib/tank');
var Player = require('./lib/player');
var Game = require('./lib/game');
var TankFactory = require('./lib/factories/tank_factory');

// Create game and add some tanks
var game = new Game();

var bio = new Player("BioBoost");
var littletank = new Tank("My Little Tank", bio);
game.add_tank(littletank);

var sille = new Player("LittleWAN");
var duke = new Tank("Tha DUKE", sille);
game.add_tank(littletank);

function publish_game_state(client) {
  client.publish('test/nubg/gamestate', game.game_state());
  logger.debug("Publishing game state:\r\n" + game.game_state());
}

var mqtt = require('mqtt');
var client = mqtt.connect("tcp://mqtt.labict.be:1883");
 
client.on('connect', function () {
  logger.info("Connected to broker");
  client.subscribe('test/nubg/general');
  client.subscribe('test/nubg/join');
  publish_game_state(client);
});
 
client.on('message', function (topic, message) {
  logger.debug("Received mqtt message '" + message.toString() + "' @" + topic);

  if (topic === "test/nubg/join") {
    let tank = TankFactory.from_json(message.toString());
    logger.info("Player " + tank.driver.nickname + " joining the game");
    game.add_tank(tank);
    publish_game_state(client);
  } else {
    logger.debug("Received invalid or unknown message via MQTT");
  }

  client.end();
});


// game.stop();
