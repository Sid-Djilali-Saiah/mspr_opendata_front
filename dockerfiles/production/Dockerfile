### STAGE 1: Build ###
FROM node:lts-alpine AS build
WORKDIR /usr/src/app
COPY ./package*.json ./
RUN npm ci
COPY ./ .
RUN npm run build:prod

### STAGE 2: Deploy ###
FROM nginx:1.19.6-alpine
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /usr/src/app/dist/mspr-opendata-front /usr/share/nginx/html
