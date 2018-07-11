var mqtt = require('mqtt')
  , host = 'localhost'
  , port = '9999';

var settings = {
  keepalive: 1000,
  protocolId: 'MQIsdp',
  protocolVersion: 3,
  clientId: 'Thermostat 1a',
  username:'info@sillevl.be ',
  password: 'the device password'
};

// client connection
var mqttClient = mqtt.createClient(port, host, settings);

setInterval(sendTemperature, 2000, mqttClient);

function sendTemperature(client){	

  console.log("Sending event");

    var t = {
        T: Math.random() * 100,
        Units: "C"
    };

    client.publish('temperature', JSON.stringify(t));
}