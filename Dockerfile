FROM golang:1.9.2-alpine3.6 AS build
ARG BRANCH=229_branch_hackathon

RUN apk add --update python
RUN apk add --update g++

RUN apk add --update nodejs nodejs-npm
RUN apk add --no-cache make git

RUN apk add --no-cache bash
RUN apk --update add git openssh

RUN git clone https://github.com/talbaneth/tmp_hack.git
RUN cd tmp_hack ;npm install; cd ..

RUN go get -u github.com/grpc-ecosystem/grpc-gateway/protoc-gen-grpc-gateway
RUN go get -u github.com/grpc-ecosystem/grpc-gateway/protoc-gen-swagger
RUN go get -u github.com/golang/protobuf/protoc-gen-go
RUN go get -u github.com/kardianos/govendor
RUN echo ${BRANCH}
#RUN mkdir -p src/github.com/spacemeshos; cd src/github.com/spacemeshos; git clone https://github.com/spacemeshos/go-spacemesh; cd go-spacemesh; git checkout ${BRANCH}; go build; govendor sync; make
RUN mkdir -p src/github.com/spacemeshos; cd src/github.com/spacemeshos; git clone https://github.com/talbaneth/go-spacemesh.git; cd go-spacemesh; git checkout ${BRANCH}; go build; govendor sync; make
RUN cp /go/src/github.com/spacemeshos/go-spacemesh/config.toml /go

ENTRYPOINT /go/src/github.com/spacemeshos/go-spacemesh/go-spacemesh $BOOTPARAMS

EXPOSE 7513
EXPOSE 9090
EXPOSE 9091
