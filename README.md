#  Weather App 🌤

> shows weather neatly

Web app that shows current weather and forecast for a city. Site is running on heroku.
https://weather-app-tn.herokuapp.com/home (might take a while to start)

## Table of contents

* [About](#about)
  * [Demo](#demo)
* [Setup](#setup)
  * [Cloning](#cloning)
  * [.ENV](#.env)
  * [NPM](#npm)
* [Client](#client)
  * [Tests](#tests)
* [Server](#server)
  * [API](#api)
    * [Success](#success)
    * [Errors](#errors)

## About

Weather App is a web application that shows weather information using the openweathermap API.

Client uses React with Redux and PropTypes. More about client [here](#client)

Server is made with Node.js and express framework. More about server [here](#server)

Project uses ESLint and has seperate ESLint configuration files for server and client.

### Demo

<img alt="demo" src="./assets/site.gif?raw=true" width="600">

## Setup

To run this project locally you need Node.js, openweathermap API key and a copy of this project.

### Cloning

Start by downloading the zip file of this project from GitHub.

Or if you have Git installed.

```
$ git clone https://github.com/toninau/react_weather_app.git
```

### .ENV

Create .env file to the root of the project folder with following variables.

```
PORT=3001
API_KEY=(YOUR_OPENWEATHERMAP_API_KEY)
```

### NPM

To run application locally using npm:

```
$ cd (your_path)/react_weather_app
$ npm install 
$ npm run install:ui
$ npm run build:ui
$ npm start
```

Application will start at your specified port number and can be accessed e.g. http://localhost:3001. If no port number was given in .env file application will default to port number 5000 (this can be changed in server/utils/config.js).

```javascript
require('dotenv').config()

let PORT = process.env.PORT || 5000
let API_KEY = process.env.API_KEY

module.exports = {
  PORT,
  API_KEY
}
```

## Client

Client is initialized with create-react-app. Client uses React with Redux and PropTypes. Also, Axios, Chart.js and React Router are used.

Tests are made with Jest and [react-testing-library](https://github.com/testing-library/react-testing-library). Also [jest-dom](https://github.com/testing-library/jest-dom) is used.

Five most recent weather searches are stored in localStorage and displayed on the home page.

Location's weather can be accessed directly when appropriate URL is given.

```
For example:
https://weather-app-tn.herokuapp.com/weather/paris
```

### Tests

To run tests:

```
$ cd client
$ CI=true npm test
```

or (in root of the project)

```
$ npm run test:ui
```

## Server

Server is made with Node.js and Express framework. Server provides a build version of the react app and an API for weather calls.

### API

Server proxies openweathermap API. API is rate limited to 6 calls in 1 minute (this can be changed in server/app.js).

```javascript
const apiLimiter = rateLimit({
  windowMs: 60 * 1000, //1 minute
  max: 6
})
```

API provides two get calls. One for getting the current weather and another for five-day forecast.


`GET /api/weather/:city`

```
For documentation:
https://openweathermap.org/current
```

`GET /api/forecast/:city`

```
For documentation:
https://openweathermap.org/forecast5
```

#### Success

>City was found

```
Status Code 🟢 200 OK
```

#### Errors

>City was not found

```
Status Code 🔴 400 Bad Request
```

>Rate limit exceeded

```
Status Code 🔴 429 Too Many Requests
```
