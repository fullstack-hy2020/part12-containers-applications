FROM node:16 AS test-stage

WORKDIR /usr/src/app

COPY . .

ENV REACT_APP_BACKEND_URL=http://localhost:8080/api

RUN npm ci --omit=dev
ENV CI=true
RUN npm test .

FROM test-stage AS build-stage


RUN npm run build

RUN npm install -g serve
CMD ["serve", "build"]
#FROM nginx:1.20-alpine
#
## COPY the directory build from build-stage to /usr/share/nginx/html
## The target location here was found from the Docker hub page
#COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html


