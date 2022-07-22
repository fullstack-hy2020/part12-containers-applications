FROM node:16 as base

WORKDIR /usr/src/app

COPY package.json package.json

COPY package-lock.json package-lock.json

FROM base as test-build

RUN npm ci

COPY . .

RUN CI=true npm test

ENV REACT_APP_BACKEND_URL="http://localhost:3001"

RUN npm run build

FROM test-build as serve

COPY --from=test-build /usr/src/app/build /usr/src/app/build

RUN npm install -g serve

CMD ["serve", "build"] 
