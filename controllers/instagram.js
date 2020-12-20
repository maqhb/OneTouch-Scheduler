const {Container} = require("typedi")
const winston = require("winston")
let logger = winston.loggers.get("Instagram.js")

exports.doPost = async (req, res)=>{
    let instagramService  = Container.get("InstagramService")
    let data = {
        user_id :req.body.user_id,
        photo : req.body.image,
        caption: req.body.caption,
        upload_date : req.body.upload_date,
        username:null,
        password:null
    }
    try {
            let response = await instagramService.PostOnInstagram(data)
            res.status(200).json({"status" : response, msg :"Post done successfully"})
    }catch (e) {
        logger.info('🔥 error: '+ e);
        //return next(e);
        return res.status(400).json({
            error: "Failed to post",
        });
    }
    /*
    const form = new IncomingForm();
    let data = {};

    form.parse(req);
    form.on('file', (filename, file) => {
        data = {
            ...data,
            'file': file
        };
    });

    form.on('field', (field, value) => {
        data = {
            ...data,
            [field]: value,
        };
    })

    form.on('end', async() => {
        try {
            let response = await instagramService.PostOnInstagram(data)
            if(response !== 'ok') res.status(400).json({"status" : response, msg :"Failed to post on account"})
            res.status(200)//.json({"status" : response, msg :"Post done successfully"})
        }catch (e) {
            logger.error('🔥 error: '+ e);
            //return next(e);
            return res.status(400).json({
                error: "Failed to post",
            });
        }
    });

     */
}

