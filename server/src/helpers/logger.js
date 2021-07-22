const winston = require('winston')

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { date: new Date() },
  transports: [
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple(),
  }));
}

module.exports = logger