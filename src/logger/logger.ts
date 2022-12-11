import * as winston from "winston";
import "winston-daily-rotate-file";
import * as Flatted from "flatted";
const format = winston.format;
const { combine, printf, errors, align } = format;

const customLevels = {
  levels: {
    error: 0,
    warn: 1,
    info: 2,
    axios: 3,
    api: 4,
    debug: 5,
    all: 6,
  },

  colors: {
    error: "black redBG",
    warn: "black yellowBG",
    info: "bold cyan",
    axios: "black greenBG",
    api: "white blueBG",
    debug: "bold grey whiteBG",
    all: "white",
  },
};

function customStringfy(object: any) {
  try {
    return JSON.stringify(object, null, 2);
  } catch (error) {
    const flat = Flatted.toJSON(object);
    return JSON.stringify(flat, null, 2);
  }
}

const logFormat = printf((info) => {
  if (info.level === "info") {
    return `${new Date().toUTCString()} ${info.level}: ${
      info.stack || info.message
    }`;
  }
  if (info.err) {
    info.stack = info.err.stack;
  }
  if (info.error) {
    info.stack = info.error.stack;
  }
  return `${new Date().toUTCString()} ${info.level}: ${
    info.message
  } \n ${customStringfy(info)}`;
});

const consoleFormat = printf((info) => {
  return `${new Date().toUTCString()} ${info.level}: ${
    info.stack || info.message
  }`;
});

const _format = combine(
  align(), // Enables easy reading
  errors({ stack: true }),
  logFormat
);

const _consoleFormat = combine(errors({ stack: true }), consoleFormat);

/**
 * Custom Filter Levels
 */

// Info & Warn
const infoAndWarnFilter = format((info, opts) => {
  return info.level === "info" || info.level === "warn" ? info : false;
});

// Error

const errorFilter = format((info, opts) => {
  if (info.level === "error") {
    // sendAlertToKeybase({ err:info });
    if (!info.stack && (info.err || info.error)) {
      info.stack = info.err || info.error;
    }
    return info;
  } else {
    return false;
  }
});

// API

const apiFilter = format((info, opts) => {
  return info.level === "api" ? info : false;
});

// Axios

const axiosFilter = format((info, opts) => {
  return info.level === "axios" ? info : false;
});

// Debug

const debugFilter = format((info, opts) => {
  return info.level === "debug" ? info : false;
});

// Setup of loggers for files and levels
const logger = winston.createLogger({
  levels: customLevels.levels,
  format: _format,
  exitOnError: false,
  transports: [
    new winston.transports.Console({
      format: combine(format.colorize(), _consoleFormat),
      level: "all",
    }),
    new winston.transports.File({
      filename: "./logs/errors.log",
      level: "error",
      format: combine(errorFilter(), _format),
    }),
    new winston.transports.DailyRotateFile({
      filename: "./logs/%DATE% - warn-info.log",
      datePattern: "YYYY-MM-DD",
      //zippedArchive: true,
      level: "info",
      format: combine(infoAndWarnFilter(), _format),
    }),
    new winston.transports.DailyRotateFile({
      filename: "./logs/%DATE% - axios.log",
      datePattern: "YYYY-MM-DD",
      //zippedArchive: true,
      level: "axios",
      format: combine(axiosFilter(), _format),
    }),
    new winston.transports.DailyRotateFile({
      filename: "./logs/%DATE% - api.log",
      datePattern: "YYYY-MM-DD",
      //zippedArchive: true,
      level: "api",
      format: combine(apiFilter(), _format),
    }),
    new winston.transports.DailyRotateFile({
      filename: "./logs/%DATE% - debug.log",
      datePattern: "YYYY-MM-DD",
      //zippedArchive: true,
      level: "debug",
      format: combine(debugFilter(), _format),
    }),
    new winston.transports.DailyRotateFile({
      filename: "./logs/%DATE% - general.log",
      datePattern: "YYYY-MM-DD",
      //zippedArchive: true,
      level: "debug",
    }),
  ],
});
winston.addColors(customLevels.colors);

export {logger as log}
