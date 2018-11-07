# Dedu

Decentralized p2p education in a self-severeign identity system.

## Brief

As nations move toward self-severign identity (SSI) management, such systems usually use public blockchains, namely ethereum.
We propose to use the benefits of a public blockchain keypair, identity and kyc management in community p2p networks.

Dedu implements a protocol for a community to manage it's education system (curriculum, timelines, vacations) in a decentralized manner.
Each participant is authenticated in the p2p network using his public blockchain identity and certifications.
The local network communication is private and fee-less as opposed to public blockchains such as ethereum.

## Main Attributes
* SelfKey SSI ethereum wallet for messages signing and authentication (1).
* Spacemesh p2p network for local communication (2).
* IPFS for decentralized proposals management (3).

(1) https://github.com/SelfKeyFoundation
(2) https://github.com/spacemeshos/go-spacemesh
(3) https://github.com/ipfs/ipfs

## installation
`npm install`
## run
in 1st terminal:
`bash -x my_boot_nodes.sh `
in 2nd terminal:
`node listener.js`
in 3rd termianl:
`node dialer.js <port>`
