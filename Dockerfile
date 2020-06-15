FROM node:lts AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./src

RUN npm install
RUN npm run build

#
# Production stage.
# This state compile get back the JavaScript code from builder stage
# It will also install the production package only
#
FROM node:lts-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./

RUN npm install -g pm2

EXPOSE $APP_PORT

COPY --from=builder /usr/src/app/dist ./dist