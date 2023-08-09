FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV PORT=3001

USER node

CMD npm start
