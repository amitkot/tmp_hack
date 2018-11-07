#!/bin/bash -x
  
#make sure we start clean
BOOTSTRAP=bootstrap
sudo docker kill $BOOTSTRAP
sudo docker rm $BOOTSTRAP

sudo docker run -d -p 9999:9090 --name bootstrap hack
sleep 4
BOOTSTRAP_NODEID=$(sudo docker logs bootstrap | grep 'Local node identit' | cut -d'>' -f 4 | xargs)
BOOTSTRAP_IP=$(sudo docker inspect -f '{{range .NetworkSettings.Networks}}{{.IPAddress}}{{end}}' bootstrap)
sudo docker logs --tail 20 bootstrap | grep 'identity'
#SUPERCMD="sudo docker run -p 9090 -e BOOTPARAMS='--swarm-bootstrap --swarm-bootstrap-nodes ${BOOTSTRAP_IP}:7513/${BOOTSTRAP_NODEID}' spacemesh_p2p"

for i in {1..5};do
	sleep 1	
	sudo docker run -d -p 9090 -e BOOTPARAMS='--swarm-bootstrap --swarm-bootstrap-nodes '"${BOOTSTRAP_IP}"':7513/'"${BOOTSTRAP_NODEID}"'' hack
done

sleep 4

DOCKERS=$(sudo docker ps -q)
for docker in $DOCKERS; do
        PORT=$(sudo docker port $docker 9090 | cut -d':' -f2)
        curl -X POST -d '{ "name":"anton", "port":8081 }' 127.0.0.1:$PORT/v1/register
done
echo "ok?"

sleep 2
#curl -X POST -d '{ "protocolName": "anton", "payload" : [0,10,10,10] }' 127.0.0.1:32783/v1/broadcast
#sudo docker kill $(sudo docker ps -a -q); sudo docker rm $(sudo docker ps -a -q)
