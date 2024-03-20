# Etapa de compilación para ejecutar pruebas
FROM node:16 as build-stage
WORKDIR /usr/src/app
COPY . .
ENV REACT_APP_BACKEND_URL=http://localhost:8080/api
ENV WATCHPACK_POLLING=true
RUN npm ci --only=production
RUN CI=true npm test
RUN npm run build

# Etapa final para servir la aplicación

FROM nginx:1.20

COPY --from=build-stage /usr/src/app/build /usr/share/nginx/html