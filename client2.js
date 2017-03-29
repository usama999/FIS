var express =require('express'); 
var app = require('express')();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var logger = require('morgan');
var request = require('request');

var sendNotifications = function(){
	request.get('http://localhost:4444/sendMessage', function(err,httpResponse,body){})
}

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/sendMessage', function(req, res){
	res.end();
	setInterval(function(){sendNotifications();},1000);
});

app.post('/', function(req, res){
	console.log(req.body)
	res.end();
});

http.listen(4446, function(){
  console.log('Client2 is running on port 4446');
});






  