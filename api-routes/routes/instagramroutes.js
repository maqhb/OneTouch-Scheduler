const {celebrate, Joi} =require("celebrate")

const express = require("express");
const router = new express.Router();

const {doPost} = require("../../controllers/instagram");
module.exports = (app)=>{
    app.use("/socials/instagram",router)

    router.post("/schedule_post", doPost)
}