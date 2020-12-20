const {Container} = require("typedi")

class InstagramService{
    socialPlatformsService
    constructor() {
        this.socialPlatformsService = Container.get("SocialPlatformService")
    }

    async PostOnInstagram(data){
        let credentials = await this.socialPlatformsService.getInstBasic(data.user_id)
        if(!credentials) throw new Error("Failed to get basic instagram credentials of user")
        data.username = credentials.email
        data.password = credentials.password
        const event = {
            name: 'instagram-post',
            id: String(Date.now()),
            after: new Date(
                this.randomizeUploadDate(Number(data.upload_date))
            ),
            data: data,
        };
        const scheduler = Container.get("Scheduler")
        scheduler.schedule(event);
        return "ok"
    }

    // adds or subtracts 0-59 seconds
    randomizeUploadDate = date => {
        const timeOffset = Math.floor(Math.random() * 59000) + 1
            return date + timeOffset
    }

    /*
    async PostOnInstagram(data){
        const readFile = util.promisify(fs.readFile);
        const fileBuffer = await readFile(data.file.path)
        data.file = fileBuffer
        let response = await this.doPost(data)
        // console.log(response)
        if(!response) throw new Error("Fail to post on instagramService >doPost method ")
        return response
        /*
        let chunks = [];
        // We can use this variable to store the final data
        let fileBuffer;

        // Read file into stream.Readable
        let fileStream = fs.createReadStream(data.file.path);

        // An error occurred with the stream
        fileStream.once('error', (err) => {
            // Be sure to handle this properly!
            throw new Error("Failed to read data")
        });

        // File is done being read
        fileStream.once('end',this.doPost() /*async () => {
            // create the final data Buffer from data chunks;
            fileBuffer = Buffer.concat(chunks);
            data.file = fileBuffer
            let response = await this.doPost(data)
            if(!response) throw new Error("Fail to post on instagramService >doPost method ")
            return response
        });

        // Data is flushed from fileStream in chunks,
        // this callback will be executed for each chunk
        fileStream.on('data', (chunk) => {
            chunks.push(chunk); // push data chunk to array

            // We can perform actions on the partial data we have so far!
        });
    }*/

    /*
    async doPost(data){
        let credentials = await this.socialPlatformsService.getInstBasic(data.user_id)
        if(!credentials) throw new Error("Failed to get basic instagram credentials of user")
        // Execute all requests prior to authorization in the real Android application
        // Not required but recommended
        await ig.simulate.preLoginFlow();
        const loggedInUser = await ig.account.login(credentials.email,credentials.password);
        if(!loggedInUser) throw new Error("Failed to LOGIN user in IGAPICLIENT")
        // The same as preLoginFlow()
        // Optionally wrap it to process.nextTick so we dont need to wait ending of this bunch of requests
        process.nextTick(async () => await ig.simulate.postLoginFlow());
        // Create UserFeed instance to get loggedInUser's posts
        let response =  await ig.publish.photo({
            file: data.file,
            caption: data.caption
        })
        return response.status
    }

     */
}

module.exports = InstagramService