
FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm install

#ENV MONGO_URL=mongodb://the_username:the_password@localhost:3456/the_database REDIS_URL=redis://localhost:6378

CMD ["npm", "run", "dev"]
