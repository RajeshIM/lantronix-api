const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

//formatting log message
const myFormat = printf(({ level, message, label, timestamp }) => {
  return `${timestamp} [${label}] ${level}: ${message}`;
});

//constructing logger object
const logger = createLogger({
  level: 'info',
  format: combine(
    label({ label: 'label1' }),
    timestamp({format: 'YYYY-MM-DD HH:mm:ss'}),
    myFormat
  ),
  transports: [
    new transports.File({ filename: 'logs/log1.log' }),
  ]
});

module.exports = logger;