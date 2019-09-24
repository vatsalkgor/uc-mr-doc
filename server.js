const express = require("express");
const app = express();
const port = process.env.PORT || 8080;
app.set('view engine','pug');

app.get('/',(req,res)=>{
    console.log("hello from express");
    res.send("hello from heroku");
    console.log(process.env.PORT);
})

app.listen(port),()=>{
    console.log(`started server on port{PORT}`);
};