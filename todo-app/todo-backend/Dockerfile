FROM node

WORKDIR /usr/src/app

COPY --chown=node:node . .

RUN npm ci --only=production

ENV MONGO_URL=mongodb://the_username:the_password@localhost:3456/the_database REDIS_URL=localhost:6378

USER node
CMD npm start
