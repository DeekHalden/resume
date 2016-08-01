var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = require('./routes/emailRouter');

var port = process.env.PORT || 5000;
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use('/', router);


app.listen(port, function() {
    console.log('Our app is running on http://localhost:' + port);
});

module.exports = app;