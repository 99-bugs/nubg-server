var winston = require('winston');

var jwt = require('jsonwebtoken');

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
let UPDATE_TOPIC = 'test/nubg/devgame/update';

let JWTSECRET = '484074319837639265922729358538';

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
  client.subscribe(UPDATE_TOPIC);
  publish_game_state(client);
});
 
client.on('message', function (topic, message) {
  logger.debug("Received mqtt message '" + message.toString() + "' @ " + topic);

  if (topic === JOIN_TOPIC) {
    let tank = TankFactory.from_json(message.toString());
    logger.info(`Player ${tank.name} (${tank.id}) joining the game`);
    if(game.tankManager.spawn(tank)) {
      publish_game_state(client);
      let token = jwt.sign({ name: tank.name, tank_id: tank.id , game_id: 'devgame'}, JWTSECRET);
      logger.info(`JWT token for ${tank.name}: ${token}`);
    } else  {
      logger.info(`Unable to spawn tank: ${tank.name}`);
    }
  } else if (topic === UPDATE_TOPIC) {
    let msg = JSON.parse(message);
    try {
      var decoded = jwt.verify(msg.token, JWTSECRET);
      logger.debug(`JWT Token content: ${JSON.stringify(decoded)}`);
      logger.info(`Update received for ${msg.id}`);
      game.tankManager.commandTank(decoded.tank_id, msg);
      publish_game_state(client);
    } catch(err) {
      logger.debug('Wrong JWT token found in update');
      logger.debug(err);
    }

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

