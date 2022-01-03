FROM node:16

USER node 

WORKDIR /usr/src/todo-app/backend

COPY --chown=node:node . .

RUN npm ci --only-production 

CMD npm start 
