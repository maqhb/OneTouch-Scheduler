const logger =require("winston").loggers
const SocialPlatformService = require("../services/SocialPlatformsService")
const InstagramService = require("../services/InstagramService")
const Scheduler = require("../schedule/scheduler")
const registerJobs =require("../schedule/schedulerJobs")

const {Container} =  require('typedi')

module.exports = async(data)=>{
    data.models.forEach(m => {
        Container.set(m.name, m.model);
    });
    //add other dependency that are needed

    Container.set("SocialPlatformService", new SocialPlatformService())
    Container.set("InstagramService", new InstagramService())
    Container.set("logger", logger)

    //scheduler
    let scheduler = new Scheduler(config.databaseURL)
    await registerJobs(scheduler.getScheduler())
    Container.set("Scheduler", scheduler)
}