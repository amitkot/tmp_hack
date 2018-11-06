const EthereumTx = require('ethereumjs-tx')
const privateKey = Buffer.from('e331b6d69882b4cb4ea581d88e0b604039a3de5967688d3dcffdd2270c0fd109', 'hex')
const utils = require('ethereumjs-util')

/////////// encode
const myString = "This is my string to be encoded/decoded";
const encoded = "0x".concat(new Buffer(myString).toString('hex')); // encoded === 54686973206973206d7920737472696e6720746f20626520656e636f6465642f6465636f646564
//const decoded = new Buffer(encoded.slice(2), 'hex').toString(); // decoded === "Thi
console.log("encoded data ",encoded)


const txParams = {
  nonce: '0x00',
  gasPrice: '0x00', 
  gasLimit: '0x00',
  to: '0x0000000000000000000000000000000000000000', 
  value: '0x00', 
  //data: '0x7f7465737432000000000000000000000000000000000000000000000000000000600057',
  data: encoded,
  // EIP 155 chainId - mainnet: 1, ropsten: 3
  chainId: 3
}

const tx = new EthereumTx(txParams)
tx.sign(privateKey)
console.log("from", tx.from.toString('hex'))
const serializedTx = tx.serialize()

/////////////////////////////
//decode

const Transaction = require('./index.js')
var reTx = new Transaction(serializedTx)
console.log("verified ", reTx.verifySignature())
//console.log(reTx.toJSON())
console.log("from", reTx.from.toString('hex'))
const decData = reTx.toJSON()[5]
const decoded = new Buffer(decData.slice(2), 'hex').toString(); // decoded === "Thi
console.log(decoded)
