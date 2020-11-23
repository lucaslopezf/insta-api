# Insta-api

This is an instagram unofficial API.

## Pre requirements 🚀

- [Node.Js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) - Usually comes with Node.js, type npm in your terminal to check for its presence
- [Git](https://git-scm.com/)

## Build and execution 🔧

1.

```console
$ git clone https://github.com/lucaslopezf/insta-api
$ cd insta-api
$ npm install
$ touch .env
$ npm run build
```

2. `Go to .env file and complete environments variables (look .env.example )`
3.

```console
$ npm run start
```

If everything is ok you will see a message like this

```javascript
{"message":"Server is running 8080","level":"info","service":"instagram-api","timestamp":"2020-11-22T23:23:15.514Z"}
```

Specification: - [swagger](https://github.com/lucaslopezf/insta-api/src/config/swagger.yaml)

## Todo's

- Fix logging
- Fix Dockerfile
- Post image
- Coverage 80%
- Lot lot lot fixes
