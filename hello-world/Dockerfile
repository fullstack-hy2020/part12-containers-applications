FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV DEBUG=hello-world:*

USER node

CMD npm start
