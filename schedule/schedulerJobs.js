const winston = require("winston").loggers

const instScheduler = require("./inst_jobs");

registerJobs = (schedulerObj)=>{
    schedulerObj.on('instagram-post', event => {
        instScheduler.postImage(event.data).then((response)=>{
            winston.get("SchedulerJobs.js").info("Post done for user with name:"+event.data.username)
        }).catch((err)=>{
            winston.get("SchedulerJobs.js").error(err)
            winston.get("SchedulerJobs.js").error("Post failed for user with name:"+event.data.username)
        })
    })
}



module.exports= registerJobs