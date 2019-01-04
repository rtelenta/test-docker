FROM node:10.15.0-jessie

# Create app directory
WORKDIR /application

RUN mkdir /nodecache && chmod 777 -R /nodecache && npm config set cache /nodecache --global

EXPOSE 80
