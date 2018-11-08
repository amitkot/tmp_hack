# PBFT

## Build image

    docker build -t pbft .



## Terminal 1 - master

Run docker image:

    docker run -it pbft

Check machine IP address:

    ip a show eth0 | grep inet | sed "s/^\D*\(\d\+\.\d\+\.\d\+\.\d\+\).*$/\1/"

Start pbft inside the machine terminal:

    cd PBFT
    node networkNode.js master full MASTER_IP this

e.g. with `MASTER_IP` being 172.17.0.2:

    node networkNode.js master full 172.17.0.2 this



## Terminal 2 - validator

    docker run -it pbft

Check machine IP address:

    ip a show eth0 | grep inet | sed "s/^\D*\(\d\+\.\d\+\.\d\+\.\d\+\).*$/\1/"

Inside the machine terminal:

    cd PBFT
    node networkNode.js network full VALIDATOR_IP MASTER_IP

e.g. with `VALIDATOR_ID` of 172.17.0.3 and `MASTER_IP` being 172.17.0.2:

    node networkNode.js network full 172.17.0.3 172.17.0.2



## Terminal 3 - queries (can be any docker machine with wget installed)

    docker run -it pbft

### Post message:

    wget -O- --post-data='{"carPlate": "-", "block": {"data": "SOME INTERESTING DATA"}}' --header=Content-Type:application/json "http://MASTER_ID:3002/createBlock"

e.g. with `MASTER_IP` of 172.17.0.2: 

    wget -O- --post-data='{"carPlate": "-", "block": {"data": "SOME INTERESTING DATA"}}' --header=Content-Type:application/json "http://172.17.0.2:3002/createBlock"


### Get all blockchain blocks:

Using the IP of one of the nodes of the blockchain, e.g. 172.17.0.3:

    wget -O - 172.17.0.3:3002/blockchain | python -m json.tool
