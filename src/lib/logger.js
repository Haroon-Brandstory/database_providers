import winston from 'winston';

const logger = winston.createLogger({
  level: 'info', // minimum log level (info, warn, error, debug)
  format: winston.format.combine(
    winston.format.colorize(), // adds colors in terminal
    winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    winston.format.printf(
      ({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`
    )
  ),
  transports: [
    new winston.transports.Console(), // logs to terminal
    // Optional: log to file
    // new winston.transports.File({ filename: 'logs/error.log', level: 'error' }),
  ],
});

export default logger;
