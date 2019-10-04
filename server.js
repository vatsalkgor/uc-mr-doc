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

    // req.on('data', (data, err) => {
app.post('/webhook',jp,(req,res)=>{
    console.log(req.body);
    res.send("hi")
})

app.listen(port),()=>{
    console.log(`started server on port{PORT}`);
};