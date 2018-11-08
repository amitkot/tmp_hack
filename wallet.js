const utils = require('ethereumjs-util')
const Transaction = require('./index.js')

module.exports.getSerializedTx = function(privateKey, myString) { 
	const encoded = "0x".concat(new Buffer(myString).toString('hex')); // encoded === 54686973206973206d7920737472696e6720746f20626520656e636f6465642f6465636f646564
	console.log("encoded data ",encoded)
	
	const txParams = {
	  nonce: '0x00',
	  gasPrice: '0x00', 
	  gasLimit: '0x00',
	  to: '0x0000000000000000000000000000000000000000', 
	  value: '0x00', 
	  data: encoded,
	  // EIP 155 chainId - mainnet: 1, ropsten: 3
	  chainId: 3
	}
	
	let walletOperations = require("./Identity-Wallet/src/common/transaction/operations.js");
	serializedTx = walletOperations.signTransaction(txParams, 0, privateKey, 0);
	console.log("serializedTx", serializedTx)
	return serializedTx
}

module.exports.getStringFromSerializedTx = function(serializedTx) {
	var reTx = new Transaction(serializedTx)
	const verified = reTx.verifySignature()
	console.log("verified ", verified)
	//console.log(reTx.toJSON())
	const from = reTx.from.toString('hex')
	console.log("from", from)
	const decData = reTx.toJSON()[5]
	const decoded = new Buffer(decData.slice(2), 'hex').toString(); // decoded === "Thi
	//console.log(decoded)
	
	return [verified, decoded, from]
}