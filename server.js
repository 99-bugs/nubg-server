var mosca = require('mosca')
var Auth0Mosca = require('auth0mosca');

var settings = {
  port: 9999,
};

//'Thermostats' is a Database connection where all devices are registered.
var auth0 = new Auth0Mosca('sillevl.eu.auth0.com', '5ahsUHjfdX4FJnK9iDGARP2zXqWCEwbr', 'BzC9BMxYD1qF6ZVVbq-XAK41vcXyL4VrdPJ69Sw8uJG-L8SVU0zdJpdJtjDWKhCs','NUBG');

//Setup the Mosca server
var server = new mosca.Server(settings);

//Wire up authentication & authorization to mosca
server.authenticate = auth0.authenticateWithCredentials();
server.authorizePublish = auth0.authorizePublish();
server.authorizeSubscribe = auth0.authorizeSubscribe();

server.on('ready', setup);

// Fired when the mqtt server is ready
function setup() {
    console.log('Mosca server is up and running');
}

server.on('clientConnected', function(client) {
  console.log('New connection: ', client.id );
});