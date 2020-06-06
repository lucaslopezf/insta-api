FROM node:12.13.0 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
COPY tsconfig*.json ./
COPY ./src ./src

RUN npm install -- production
RUN npm install -g pm2
RUN npm run build

#
# Production stage.
# This state compile get back the JavaScript code from builder stage
# It will also install the production package only
#
FROM node:12.13.0-alpine

WORKDIR /app
ENV NODE_ENV=production

COPY package*.json ./

EXPOSE $APP_PORT

COPY --from=builder /usr/src/app/dist ./dist

CMD ["npm","start"]