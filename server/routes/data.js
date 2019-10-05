const data = require("express").Router();
const knowabout = require('../models/knowabout')

data.get('/knowabout',async (req,res,next)=>{
    // let data = await knowabout.getKnowAbouts();
    // console.log(data) // returning undefined
    res.json(await knowabout.getKnowAbouts()); // prints data to console. does not send to the response
    // res.send('hi')
})

module.exports = data;