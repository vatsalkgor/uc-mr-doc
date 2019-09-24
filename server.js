const express = require("express");
const app = express();
app.set('view engine','pug');

app.get('/',(req,res)=>{
    console.log("hello from express");
    res.send("hello from heroku");
})

app.listen(3000),()=>{
console.log("started on 3000")
};