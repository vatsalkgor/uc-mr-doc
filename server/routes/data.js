const data = require("express").Router();
const knowabout = require('../models/knowabout')

data.get('/knowabout',async (req,res,next)=>{
    const resp = await knowabout.getKnowAbouts();
    console.log(typeof(resp))
    let data=[]
    let lable=[];
    Object.keys(resp).forEach(key=>{
        data.push(resp[key].ic)
        lable.push(new Date(resp[key].added));
    })
    // resp.foreach(r=>{
    //     data.push(r.ic);
    //     lable.push(new Date(r.added))
    // })
    res.json({data,lable});
})

module.exports = data;