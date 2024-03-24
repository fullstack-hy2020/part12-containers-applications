FROM node:16 as build-stage

WORKDIR /usr/src/app

COPY . .

# Change npm ci to npm install since we are going to be in development mode
ENV REACT_APP_URL_BACKEND=http://localhost:8080/api/
RUN npm ci
RUN npm run build

# Etapa final para servir la aplicación

FROM nginx:1.20

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html