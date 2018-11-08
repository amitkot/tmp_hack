var args = process.argv.slice(2);

let skipParse = false
if (args[0] == "skipParse") {
	skipParse = true
}

let votes = {"13807fb779cb8b83e4e1a39b4792f717fee6b1b2": "undecided",
			 "de7882bf20a1ca504422d87fda87ba0e78f6aca1": "undecided",
			 "6012b2ff767b5d78299e215f78ad79383b8c7b95": "yes",
			 "ce7b775acc052ad1f2f6912c0038db8417e5de81": "yes",
			 "df7c4efc5cdef37e72402ca8c7ba691986dbf9a9": "yes"}
let totalYesVotes = 3
let totalNoVotes = 0
var TOTAL_NUM_NODES = 5
var MAJORITY_NEEDED = 4 //round_up((2/3)*TOTAL_NUM_NODES

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
    
    if (!skipParse) {
    	parseData(message);
    } else {
        console.log("herrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrre!")
    }
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
    var docHash = a[0]
    var vote = a[1]
        
    //// incerment the authenticated vote 
    if (verified) {
        votes[from] = vote
    }
    
    //// return (for printing) the relevant data
    voteParsedData = {
    	"docHash":docHash,
  	  	"vote":vote,
  	  	"from":from,
  	  	"verified":verified
	}

	console.log("current vote:\n", voteParsedData)
	console.log("total votes status:\n", votes)
	
	// count total votes
	if (vote == "yes") {
		totalYesVotes++;
	}
	else if (vote == "no") {
		totalNoVotes++;
	}
	
    if((totalYesVotes >= MAJORITY_NEEDED) || (totalNoVotes >= MAJORITY_NEEDED)) {
    	console.log("**************************************")
    	console.log("reached consensus!!! ".concat(vote).concat(" for ").concat(docHash))
    	console.log("**************************************")
    }
}