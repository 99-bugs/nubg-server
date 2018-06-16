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

let JOIN_TOPIC = "test/nubg/join";
let GAMESTATE_TOPIC = "test/nubg/gamestate";

// Create game and add some tanks
var game = new Game();

var bio = new Player("BioBoost");
var littletank = new Tank("My Little Tank", bio);
game.add_tank(littletank);

var sille = new Player("LittleWAN");
var duke = new Tank("Tha DUKE", sille);
game.add_tank(littletank);

function publish_game_state(client) {
  client.publish(GAMESTATE_TOPIC, game.game_state());
  logger.debug("Publishing game state: " + game.game_state());
}

var mqtt = require('mqtt');
var client = mqtt.connect("tcp://mqtt.labict.be:1883");
 
client.on('connect', function () {
  logger.info("Connected to broker");
  client.subscribe(JOIN_TOPIC);
  publish_game_state(client);
});
 
client.on('message', function (topic, message) {
  logger.debug("Received mqtt message '" + message.toString() + "' @ " + topic);

  if (topic === JOIN_TOPIC) {
    let tank = TankFactory.from_json(message.toString());
    logger.info("Player " + tank.driver.nickname + " joining the game");
    game.add_tank(tank);
    publish_game_state(client);
  } else {
    logger.debug("Received invalid or unknown message via MQTT");
  }
});

// Catch the SIGINT (detect when CTRL-C is pressed)
if (process.platform === "win32") {
  var terminal = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
  });

  terminal.on("SIGINT", function () {
    process.emit("SIGINT");
  });
}

process.on("SIGINT", function () {
  //graceful shutdown
  logger.info("Server is shutting down");
  client.end();
  process.exit();
});
