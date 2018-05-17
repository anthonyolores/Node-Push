const express = require('express');
const webPush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));

const publicKey = 'BJq1o9fZXpsyZkEDS54m0-UTYEp0Ab4leKHfo0LmODAAitL_YBIaxLykQypltOmEc6OxJIvQwv3VNdy98yjyr6M';
const privateKey = 'VuyyzuEQx25XXYiol6pkFuVObcKgT1nMbE0Kvoo_W00';

webPush.setVapidDetails('mailto:masterbahbidi@gmail.com', publicKey, privateKey);

//subscribe route
app.post('/subscribe',(request, response) => {
    //get subscribed object
    const subscription = request.body;

    //send 201 - resource created
    response.status(201).json({});

    //data to send
    const dataSend = JSON.stringify({title: 'this is my data'});

    //send data to notify
    webPush.sendNotification(subscription, dataSend).catch(err => console.log(err));

});


const port = 4080;
app.listen(port, () => console.log(`Server running on port ${port}`));