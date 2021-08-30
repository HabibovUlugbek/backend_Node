require("express-async-errors")
require("winston-mongodb")
const winston = require("winston")

module.exports = function () {
    winston.add(new winston.transports.Console())
    winston.add(new winston.transports.File({filename: 'logs/error-logs.log' , level:"error"}))
    winston.add(new winston.transports.MongoDB({db: 'mongodb://localhost/back_error_logs', level:"error"}))
    winston.exceptions.handle( new winston.transports.Console(),new winston.transports.File({filename: 'logs/error-logs.log'}))
    process.on("unhandledRejection", ex => {
        throw ex;
    })
}