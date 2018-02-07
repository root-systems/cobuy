FROM node:8

MAINTAINER Michael Williams <michael.williams@enspiral.com>

USER root
RUN \
  mkdir /home/node/.npm-global ; \
  mkdir /home/node/app/ ; \
  chown -R node:node /home/node/
ENV PATH=/home/node/.npm-global/bin:$PATH
ENV NPM_CONFIG_PREFIX=/home/node/.npm-global

USER node

WORKDIR /home/node/app

ARG NODE_ENV=development
ENV NODE_ENV $NODE_ENV
COPY --chown=node:node package.json /home/node/app/
RUN npm install && npm cache clean --force
COPY --chown=node:node . /home/node/app

CMD ["npm", "start"]

ARG PORT=5000
EXPOSE $PORT
