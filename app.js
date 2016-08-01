var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var router = require('./routes/emailRouter');

app.set('port', (process.env.PORT || 8080));
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.json());
app.use('/', router);



app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
