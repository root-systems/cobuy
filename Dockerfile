FROM node:8

MAINTAINER Michael Williams <michael.williams@enspiral.com>

USER root
RUN mkdir /home/node/.npm-global ; \
chown -R node:node /home/node/
ENV PATH=/home/node/.npm-global/bin:$PATH
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

USER node

WORKDIR /usr/src/app

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV
COPY package.json /home/node/app/
RUN npm install && npm cache clean
COPY . /home/node/app

CMD ["npm", "start"]

ARG PORT=5000
EXPOSE $PORT