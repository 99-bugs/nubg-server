var Tank = require('./lib/tank');
var Player = require('./lib/player');
var Game = require('./lib/match');

var bio = new Player("BioBoost");
var littletank = new Tank("My Little Tank", bio);

var sille = new Player("LittleWAN");
var duke = new Tank("Tha DUKE", sille);

console.log(littletank);
console.log(duke);



var MQTT = require("async-mqtt");
var AsyncClient = MQTT.AsyncClient;
var client = new AsyncClient(MQTT.connect("tcp://mqtt.labict.be:1883"));
 

client.publish("test/nubg", "server comming online").then(function(){
    console.log("We async now");
    return client.end();
});



var game = new Game();
console.log(game);

