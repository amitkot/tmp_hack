var dgram = require('dgram');
var server = dgram.createSocket('udp4');

// listen to udp messages on the relevant port
var PORT = 8996 //8081;
var HOST = '0.0.0.0';

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message);
});

server.bind(PORT, HOST);
