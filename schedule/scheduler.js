const msm = require('mongo-scheduler-more');
const winston = require("winston").loggers;

class Scheduler{
    scheduler

    driverOptions = {
        useNewUrlParser: true,
        dbname: 'scheduled_posts',
        loggers : winston.get('SchedulerJobs.js'),
        loggerLevel: 'info'
    }
    constructor(db) {
        this.scheduler = new msm(db, this.driverOptions)
    }

    getScheduler(){
        return this.scheduler
    }

    schedule(event){
        this.scheduler.schedule(event)
    }

    //pass the id and function that needed to be executed when that job occur
    registerJob(jobId, job){
        this.scheduler.on(jobId,job)
    }
}

module.exports = Scheduler