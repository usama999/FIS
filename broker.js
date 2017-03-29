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

app.post('/notifs', function(req, res){
	console.log(req.body);
	if(req.body.id == "Z2_Changed")
	{
		//cleint 1
		request.post('http://localhost:4445',{form:{event:req.body}}, 
		function(err,httpResponse,body){});
		
	}
	else if(req.body.id == "Z3_Changed")
	{
		
		//cleint 1
		request.post('http://localhost:4445',{form:{event:req.body}}, 
		function(err,httpResponse,body){});
		
		//cleint 2
		request.post('http://localhost:4446',{form:{event:req.body}}, 
		function(err,httpResponse,body){});
	}
	else if(req.body.id == "Z5_Changed")
	{
		
		//cleint 2
		request.post('http://localhost:4446',{form:{event:req.body}}, 
		function(err,httpResponse,body){});
	}
	res.end();
});   


request.post('http://localhost:3000/RTU/SimCNV8/events/Z2_Changed/notifs',{form:{destUrl:"http://localhost:4444/notifs"}}, function(err,httpResponse,body){});
request.post('http://localhost:3000/RTU/SimCNV8/events/Z3_Changed/notifs',{form:{destUrl:"http://localhost:4444/notifs"}}, function(err,httpResponse,body){});
request.post('http://localhost:3000/RTU/SimCNV8/events/Z5_Changed/notifs',{form:{destUrl:"http://localhost:4444/notifs"}}, function(err,httpResponse,body){});
	

http.listen(4444, function(){
  console.log('The BROKER is listening on :4444');
});






  