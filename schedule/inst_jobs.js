const winston = require("winston").loggers
const {Container} = require("typedi")
const Instagram = require('instagram-web-api')
const FileCookieStore = require('tough-cookie-filestore2')

module.exports = {
    //INFO:: Add functionality to post on instagram post
  postImage : async (data) => {
    Container.get("SocialPlatformService")
    let loggers = winston.get('inst_jobs.js')
    //store login user in json file for future user
    const cookiesFile = `./sessions/instagram/${data.user_id}.json`;
    const cookieStore = new FileCookieStore(cookiesFile)
    // URL or path of photo
    const client = new Instagram({ username:data.username,password:data.password, cookieStore:cookieStore})

    await client.login();
    // Upload Photo to feed or story, just configure 'post' to 'feed' or 'story'
    let response = await client.uploadPhoto({ photo: data.photo, caption: data.caption, post: 'feed' })
    if(response.status !== "ok") loggers.error(`Failed to post scheduled post of user with "username:${data.username} and "userId:${data.user_id}"`)
    loggers.info(`Successfully posted scheduled post of user with "username:${data.username} and "userId:${data.user_id}"`)
  }
}