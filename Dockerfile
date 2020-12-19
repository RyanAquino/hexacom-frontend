FROM node:lts-alpine as build-step
WORKDIR /app
COPY ./package.json ./
RUN npm install
COPY ./ ./
RUN npm run build

FROM nginx:stable-alpine
COPY --from=build-step /app/build /usr/share/nginx/html
COPY --from=build-step /app/default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
