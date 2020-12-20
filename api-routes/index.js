const express = require("express");
let instagram = require("./routes/instagramroutes")

// guaranteed to get dependencies
// const app = router;
// guaranteed to get dependencies

// module.exports  = () => {
//     const app = express.Router();
//     // console.log("Here");
//     auth(app);
    
//     return app
// }

module.exports =   ()=>{
    let app = express.Router();
    instagram(app);
    return app
}
//exports.authRouter = auth;
//exports.socialPlatformsRouter = socialPlatforms