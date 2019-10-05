const express = require("express");
const app = express();
const bp = require('body-parser');
const jp = bp.json();
const port = process.env.PORT || 8080;
const connection = require('./db');

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    console.log("hello from express");
    res.send("hello from heroku");
    console.log(process.env.PORT);
})

// req.on('data', (data, err) => {
app.post('/webhook', jp, (req, res) => {
    console.log(req.body);
    if (req.body.queryResult.intent.displayName.toLowerCase() == "knowabout") {
        session_array = req.body.queryResult.session.split('/');
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
                                        req.body.queryResult.fulfillmentText
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

app.listen(port), () => {
    console.log(`started server on port{PORT}`);
};