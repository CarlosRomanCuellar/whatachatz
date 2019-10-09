# base image
FROM node:alpine

WORKDIR /usr/app

#install dependencies
COPY ./package.json ./
RUN npm install
#ARG SOCKET_ENDPOINT
#ENV SOCKET_ENDPOINT $SOCKET_ENDPOINT
COPY ./ ./

#default command
CMD ["npm","start"] 