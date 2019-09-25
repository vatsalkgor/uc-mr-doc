const express = require("express");
const app = express();
const bp = require('body-parser');
const jp = bp.json();
const port = process.env.PORT || 8080;
app.set('view engine','pug');

app.get('/',(req,res)=>{
    console.log("hello from express");
    res.send("hello from heroku");
    console.log(process.env.PORT);
})

app.post('/webhook',jp,(req,res)=>{
    // req.on('data', (data, err) => {
    //     if (err) res.status(404).send({error: "invalid json"}); 
    //     req.body = JSON.parse(data);
    //     // console.log(req.body);
    //     res.send(req.body);
    // });
    console.log(req.body);
    res.send("hi")
})

app.listen(port),()=>{
    console.log(`started server on port{PORT}`);
};