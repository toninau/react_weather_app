const logger = require('./logger')
const path = require('path')

const requestLogger = (request, _response, next) => {
  logger.info('Method:', request.method)
  logger.info('Path:  ', request.path)
  logger.info('Body:  ', request.body)
  logger.info('---')
  next()
}

const unknownEndpoint = (_request, response) => {
  response.sendFile(path.resolve('client', 'build', 'index.html'))
}

const errorHandler = (error, _request, response, next) => {
  logger.error(error.message)

  if (error.name === 'Error') {
    return response.status(400).send({ error: error.message })
  }

  next(error)
}

module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler
}