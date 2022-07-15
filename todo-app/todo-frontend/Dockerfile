FROM node:16

WORKDIR /usr/src/app

COPY . .

RUN npm ci

ENV REACT_APP_BACKEND_URL="http://localhost:3001"

RUN npm run build

RUN npm install -g serve

CMD ["serve", "build"]
