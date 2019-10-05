const express = require("express");
const app = express();
const bp = require('body-parser');
const jp = bp.json();
const port = process.env.PORT || 8080;
const connection = require('./db');
const data = require('./routes/data');
app.set('view engine', 'pug');
app.set('json spaces',40);

app.get('/', (req, res) => {
    // console.log("hello from express");
    res.render("index");
    // console.log(process.env.PORT);
})
let options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['pug','js','css'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
      res.set('x-timestamp', Date.now())
    }
  }
  
  app.use(express.static('views', options))
  
// req.on('data', (data, err) => {
app.post('/webhook', jp, (req, res) => {
    if (req.body.queryResult.intent.displayName.toLowerCase() == "knowabout") {
        session_array = req.body.session.split('/');
        connection.execute(`insert into uc_data(session_id,intent) VALUES('${session_array[session_array.length - 1]}','${req.body.queryResult.intent.displayName}')`, (err, results, fields) => {
            if (!err) {
                console.log(results);
                console.log(fields);
                res.json({
                    "fulfillmentText":req.body.queryResult.fulfillmentText,
                    "payload":{
                        "google":{
                            "expectUserResponse":true,
                            "richResponse":[
                                {
                                    "simpleResponse":{
                                        "textToSpeech":req.body.queryResult.fulfillmentText
                                    }
                                }
                            ]
                        }
                    }
                })
            }
        });
    }
})

app.use('/api/data',data);

app.listen(port), () => {
    console.log(`started server on port{PORT}`);
};