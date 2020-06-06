FROM node:10.13.0-alpine

ENV NODE_ENV=production
ENV APP_PORT=8080

WORKDIR /usr/src/app

COPY package.json .
RUN npm install

RUN npm install pm2 -g

RUN npm run build

COPY ./dist .

EXPOSE APP_PORT

CMD ["pm2-runtime","server.js"]