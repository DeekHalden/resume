var express = require('express');
var mg = require('nodemailer-mailgun-transport');
var bodyParser = require('body-parser');
var nodemailer = require('nodemailer');


var bodyParser = require('body-parser');
var router = express.Router();


router.use(bodyParser.urlencoded({ extended: true }));

router.post('/', function(req, res) {


    var auth = {
            auth: {
                api_key: 'key-d40c168dc6123dfc8c143ccf1c1525ea',
                domain: 'sandbox693909a1fb8a47879f32c3008dc45248.mailgun.org'
            }
        }
        //Setup Nodemailer transport, I chose gmail. Create an application-specific             password to avoid problems.
    var transporter = nodemailer.createTransport(mg(auth));

    var mailOptions = {
        from: ''+req.body.name+' <' + req.body.email + '>',
        to: 'iliy4@ua.fm',
        subject: 'Text',
        text: req.body.content
    };
    transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
            console.log(error);
            res.json({ yo: 'error' });
        } else {
            console.log('Message sent: ' + info);
            console.log(req.body.email);
            res.json({ yo: info.message });
        };
    });
}); 

module.exports = router;