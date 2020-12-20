const {Container} = require("typedi")
const bcrypt = require("bcrypt")

class SocialPlatformsService{
    socialPlatformsModel
    constructor() {
        this.socialPlatformsModel = Container.get("social_platforms")
    }

    //getters for tokens/data of social platforms
    async getInstBasic(userId){
        let doc = await this.socialPlatformsModel.findOne({user_id:userId})
        if(doc){
            return doc.instagram.basic_instagram
        }else{
            return null
        }
    }

    async getInstGraph(){
    }

}


module.exports = SocialPlatformsService