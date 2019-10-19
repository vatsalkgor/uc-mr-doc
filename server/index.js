const express = require("express");
const app = express();
const bp = require('body-parser');
const jp = bp.json();
const port = process.env.PORT || 8080;
const connection = require('./db');
const data = require('./routes/data');
const events = new require("events");
const sse = require("./routes/sse");
let repeat_count = 0;
const cors = require("cors");
let emergency = { 'user': null, 'query': null };
let knowabout_count = 0;
let current_users = [];
let current_predictions = [];
const predict = require('./predictDisease');
const predictor = new predict();
app.set('view engine', 'pug');
app.set('json spaces', 40);
app.use(jp);
app.use(cors())
// app.get('/', (req, res) => {
//     // console.log("hello from express");
//     res.render("index");
//     // console.log(process.env.PORT);
// })
let options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['pug', 'js', 'css'],
    index: false,
    maxAge: '1d',
    redirect: false,
    setHeaders: function (res, path, stat) {
        res.set('x-timestamp', Date.now())
    }
}

app.use(express.static('views', options))

// req.on('data', (data, err) => {
app.post('/webhook', (req, res, next) => {
    if (req.body.queryResult.intent.displayName.toLowerCase() == "knowabout") {
        let session_array = req.body.session.split('/');
        connection.execute(`insert into uc_data(session_id,intent) VALUES('${session_array[session_array.length - 1]}','${req.body.queryResult.intent.displayName}')`, (err, results, fields) => {
            if (!err) {
                knowabout_count += 1;
                return res.json({
                    "fulfillmentText": req.body.queryResult.fulfillmentText,
                    "payload": {
                        "google": {
                            "expectUserResponse": true,
                            "richResponse": {
                                "items": [
                                    {
                                        "simpleResponse": {
                                            "textToSpeech": req.body.queryResult.fulfillmentText,
                                            "displayText": req.body.queryResult.fulfillmentText
                                        }
                                    }
                                ]
                            }
                        }
                    }
                })
            }
        });
    } else if (req.body.queryResult.intent.displayName.toLowerCase() == "prescription") {
        repeat_count += 1;
        console.log(repeat_count)
        return res.json({
            "fulfillmentText": req.body.queryResult.fulfillmentText,
            "payload": {
                "google": {
                    "expectUserResponse": true,
                    "richResponse": {
                        "items":
                        {
                            "simpleResponse": {
                                "textToSpeech": req.body.queryResult.fulfillmentText,
                                "displayText": req.body.queryResult.fulfillmentText
                            }
                        }
                    }
                }
            }
        })
    } else if (req.body.queryResult.intent.displayName.toLowerCase() == "emergency") {
        let session_array = req.body.session.split('/');
        emergency = {
            'user': session_array[session_array.length - 1],
            'query': req.body.queryResult.queryText
        }
        return res.json({
            "fulfillmentText": req.body.queryResult.fulfillmentText,
            "payload": {
                "google": {
                    "expectUserResponse": true,
                    "richResponse": {
                        "items": {
                            "simpleResponse": {
                                "textToSpeech": req.body.queryResult.fulfillmentText,
                                "displayText": req.body.queryResult.fulfillmentText
                            }
                        }
                    }
                }
            }
        })
    } else {
        let session_array = req.body.session.split('/');
        if (req.body.queryResult.queryText.toLowerCase().includes('no')) {
            console.log(current_users.find(x => x.username == session_array[session_array.length - 1]).data)
            let percentage = predictor.predictDisease(current_users.find(o => o.username == session_array[session_array.length - 1]).data);
            current_predictions.push({
                "user": session_array[session_array.length - 1],
                "prediction": percentage > 0.3 ? "Yes" : "No",
                "symptoms": current_users.find(x => x.username == session_array[session_array.length - 1]).data
            })
            res.json({
                "fulfillmentText": percentage > 0.3 ? `We predicted that you have measels and your GP has been informed about that.` : `No need to worry just take some care and general medicines.`,
                "payload": {
                    "google": {
                        "expectUserResponse": true,
                        "richResponse": {
                            "items": {
                                "simpleResponse": {
                                    "textToSpeech": percentage > 0.3 ? `We predicted that you have measels and your GP has been informed about that.` : `No need to worry just take some care and general medicines.`,
                                    "displayText": percentage > 0.3 ? `We predicted that you have measels and your GP has been informed about that.` : `No need to worry just take some care and general medicines.`
                                }
                            }
                        }
                    }
                }
            })
        } else {
            if (current_users.find(o => o.username == session_array[session_array.length - 1]) == undefined) {
                let obj = {
                    "username": session_array[session_array.length - 1],
                    "data": req.body.queryResult.parameters.Symptoms,
                }
                current_users.push(obj);
            } else {
                current_users.find(o => o.username == session_array[session_array.length - 1]).data.push(...req.body.queryResult.parameters.Symptoms)
            }
            console.log(current_users);
            res.json({
                "fulfillmentText": "Do you have any other symptoms?",
                "payload": {
                    "google": {
                        "expectUserResponse": true,
                        "richResponse": {
                            "items": {
                                "simpleResponse": {
                                    "textToSpeech": "Do you have any other symptoms?",
                                    "displayText": "Do you have any other symptoms?"
                                }
                            }
                        }
                    }
                }
            })
        }
    }
})

app.use('/sse-repeat', (req, res) => {
    res.json({ repeat_count });
})

app.use('/sse-emergency', (req, res, next) => {
    res.json({ emergency });
    next();
})

app.use('/sse-emergency', (req, res, next) => {
    emergency = {
        'user': null,
        'query': null
    }
})
app.use('/sse-knowabout', (req, res) => {
    res.json({ knowabout_count });
})

app.use('/sse-appointments', (req, res) => {
    res.json({ appointments: current_predictions });
})



app.use('/api/data', data);

app.listen(port), () => {
    console.log(`started server on port{PORT}`);
};