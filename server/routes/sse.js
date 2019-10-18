const route = require("express").Router();

route.get('/sse-prescription',(req,res)=>{
    res.setHeader('Content-Type','text/event-stream');
    res.setHeader('Cache-Control','no-cache');
    res.setHeader('Connection','keep-alive')
    res.send('hi')
})

module.exports = route;