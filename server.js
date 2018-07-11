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

var Tank = require('./lib/Tank');
var Game = require('./lib/Game');
var TankFactory = require('./lib/factories/tank_factory');

let JOIN_TOPIC = "test/nubg/join";
let GAMESTATE_TOPIC = "test/nubg/devgame/gamestate";

// Create game and add some tanks
var game = new Game();

var littletank = new Tank("My Little Tank");
game.tankManager.spawn(littletank);

var duke = new Tank("Tha DUKE");
game.tankManager.spawn(duke);

function publish_game_state(client) {
  let options = {retain: true};
  client.publish(GAMESTATE_TOPIC, JSON.stringify(game.getState()), options);
  logger.debug("Publishing game state: " + JSON.stringify(game.getState()));
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
    logger.info(`Player ${tank.name} (${tank.id}) joining the game`);
    game.tankManager.spawn(tank);
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
