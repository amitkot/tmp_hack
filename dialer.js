const { randomBytes } = require('crypto')
const secp256k1 = require('secp256k1')
const web3 = require('web3')
const wallet = require('./wallet.js')

/////////////////////////////////

//const privateKey = Buffer.from('e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109', 'hex')

// generate privKey
let privKey
do {
	privKey = randomBytes(32)
} while (!secp256k1.privateKeyVerify(privKey))

// get the public key in a compressed format
const pubKey = secp256k1.publicKeyCreate(privKey)

// we send all buffer types as json string
const myString = "dochash-yes"
const data = wallet.getSerializedTx(privKey, myString)

/////////////////////////////////

var PORT = 8081;
var HOST = '127.0.0.1';

var dgram = require('dgram');
var message = new Buffer(data);

var client = dgram.createSocket('udp4');
client.send(message, 0, message.length, PORT, HOST, function(err, bytes) {
if (err) throw err;
console.log('UDP message sent to ' + HOST +':'+ PORT);
client.close();
});

////////////////////
//TODO - once spacemesh works - post with curl to the relvant node instead of creating the above socket

//curl -X POST -d '{ "protocolName": "anton", "payload" : [0,10,10,10] }' 127.0.0.1:32783/v1/broadcast
/*
var request = require('request');

//Configure the request

var options = {
 url: '127.0.0.1:32783/v1/broadcast',
 method: 'POST',
}

//Start the request
request(options, function (error, response, body) {
 if (!error && response.statusCode == 200) {
 // Print out the response body
 console.log(body)
 }
})
*/
///////////////////////

