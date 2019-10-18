const {logLevel} = require('kafkajs');
let bunyan = require('bunyan');

let levelTranslation = level => {
  switch (level) {
    case logLevel.ERROR:
    case logLevel.NOTHING:
      return 'error'
    case logLevel.WARN:
      return 'warn'
    case logLevel.INFO:
      return 'info'
    case logLevel.DEBUG:
      return 'trace'
  }

  return 'trace'
}

let logger = bunyan.createLogger({
  name: "learn-kafka",
  streams: [{ stream: process.stdout, level: 'trace' }]
});

module.exports = (logLevel) => ({namespace, level, label, log}) => {
  let {message} = log || { message: '' }
  let logData = { namespace, label };

  switch (level) {
    case logLevel.ERROR:
    case logLevel.NOTHING:
      return logger.error(message, logData)
    case logLevel.WARN:
      return logger.warn(message, logData)
    case logLevel.INFO:
      return logger.info(message, logData)
    case logLevel.DEBUG:
      return logger.trace(message, logData)
  }

  logger.trace(message, logData)
}
