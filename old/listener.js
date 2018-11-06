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
    parseData(message)
});

server.bind(PORT, HOST);

///////////////////////////
const web3 = require('web3')
const secp256k1 = require('secp256k1')

// authentication scheme
function parseData(data) {
    let d = data.toString('utf8').replace('\n', '')
    
    /////// hack ///////
    //parse input  
    var a = d.split("-");
    var pardon_hash = a[0]
    var vote = a[1]
    var voter_pub_key = a[2]
    var sig = a[3]
    
    //// retrieve public key and signatures as buffer objects
    var pubKey = Buffer.from(JSON.parse(voter_pub_key).data);  
    var sig = Buffer.from(JSON.parse(sig).data);

    //// re-assemble unsigned msg 
    var unsignedMsg = a[0].concat("-").concat(a[1]).concat("-").concat(a[2])

    //// also on receiver side the msg is hashed before verification 
    var sha3msg = (web3.utils.sha3(unsignedMsg)).slice(2)
    const msg = Buffer.from(sha3msg, 'hex')

    //// verify message 
    const verified = secp256k1.verify(msg,sig,pubKey)
    
    //// incerment the authenticated vote 
    if (verified) {
        votes[vote]++
    }
    
    //// return (for printing) the relevant data
    voteParsedData = {
    	"pardon_hash":pardon_hash,
  	  	"vote":vote,
  	  	"voter_pub_key":voter_pub_key,
  	  	"sig":sig,
  	  	"verified":verified
	}

	console.log(voteParsedData)
	console.log(votes)
    /////// end of hack /////// 
}