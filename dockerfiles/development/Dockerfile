FROM node:lts-alpine

WORKDIR /usr/app

COPY ./package*.json ./

RUN npm ci -qy

COPY ./ .

EXPOSE 4200

CMD ["npm", "run", "start:dev"]
