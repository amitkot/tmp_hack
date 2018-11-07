let votes = {"yes":0, "no":0}

/////////////////////////////
var dgram = require('dgram');
var server = dgram.createSocket('udp4');

// listen to udp messages on the relevant port
var PORT = 8081;
var HOST = '127.0.0.1';

server.on('listening', function () {
    var address = server.address();
    console.log('UDP Server listening on ' + address.address + ":" + address.port);
});

server.on('message', function (message, remote) {
    console.log(remote.address + ':' + remote.port +' - ' + message);
    console.log("herrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrre!")
    //tmp removal
    //parseData(message)
});

server.bind(PORT, HOST);

///////////////////////////
const web3 = require('web3')
const secp256k1 = require('secp256k1')
const wallet = require('./wallet.js')

// authentication scheme
function parseData(data) {
    let d = data.toString('utf8').replace('\n', '')
    
    let verified;
    let decoded;
    let from;
    [verified, decoded, from] = wallet.getStringFromSerializedTx(d);
    
    /////// hack ///////
    //parse input  
    var a = decoded.split("-");
    var pardon_hash = a[0]
    var vote = a[1]
        
    //// incerment the authenticated vote 
    if (verified) {
        votes[vote]++
    }
    
    //// return (for printing) the relevant data
    voteParsedData = {
    	"pardon_hash":pardon_hash,
  	  	"vote":vote,
  	  	"from":from,
  	  	"verified":verified
	}

	console.log(voteParsedData)
	console.log(votes)
    /////// end of hack /////// 
}