var express =require('express'); 
var app = require('express')();
var bodyParser = require('body-parser');
var http = require('http').Server(app);
var logger = require('morgan');
var request = require('request');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/sendMessage', function(req, res){
	res.end();
});

app.post('/', function(req, res){
	console.log(req.body)
	res.end();
});

http.listen(4445, function(){
  console.log('Client1 is running on port 4445');
});






  