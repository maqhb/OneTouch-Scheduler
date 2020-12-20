const initLogger = require("./logger");
expressLoader = require("./express");
mongooseLoader = require("./mongoose");
dependencyInjectorLoader = require("./dependencyInjection")
firebaseServiceAccount = require("./firebaseAdmin")

loadApp = async (app) => {
  await initLogger(app);
  await mongooseLoader();
  await firebaseServiceAccount()


  //add all the models to Container that are needed in service layer
  let socialPlatformsModel = {
    name: "social_platforms",
    model: require("../models/socialplatforms")
  }
  await dependencyInjectorLoader({
    models: [
      socialPlatformsModel
    ],
  });

  await expressLoader(app);
  console.log(`✌️ Server up and running on port ${config.port} in ${config.environment}!`);
};
module.exports = loadApp;
