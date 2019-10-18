const data = require("express").Router();
const knowabout = require('../models/knowabout')

data.get('/knowabout',async (req,res,next)=>{
    const {rows} = await knowabout.getKnowAbouts();
    let data=[]
    let lable=[];
    Object.keys(rows).forEach(key=>{
        data.push(rows[key].ic)
        lable.push(new Date(rows[key].added));
    })
    res.json({data,lable});
})

module.exports = data;