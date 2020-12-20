const winston = require("winston");

const DEFAULT_CATEGORY = "DEFAULT";

createLoggerConfig = (category)=> {
  return {
    level: "debug",
    transports: [
      new winston.transports.Console(),
    ],
    format: winston.format.combine(
        winston.format.label({
          label: category,
        }),
        winston.format.timestamp(),
        winston.format.printf((info) => {
          return `${info.timestamp} - ${info.label}:[${info.level}]: ${info.message}`;
        }),
    ),
  };
};

// Define all the logging categories
winston.loggers.add(DEFAULT_CATEGORY, createLoggerConfig(DEFAULT_CATEGORY));
winston.loggers.add("database.js", createLoggerConfig("database.js"));
winston.loggers.add("server.js", createLoggerConfig("server.js"));

winston.loggers.add("SocialPlatforms.js", createLoggerConfig("SocialPlatforms.js"));
winston.loggers.add("Instagram.js", createLoggerConfig("Instagram.js"));

winston.loggers.add("SchedulerJobs.js", createLoggerConfig("SchedulerJobs.js"))
winston.loggers.add("inst_jobs.js", createLoggerConfig("inst_jobs.js"))


module.exports = createLoggerConfig;
