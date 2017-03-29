var express = require('express');
var app = express();
var mysql      = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'usama999',
    database:'fis2'
});



app.get('/myform', function(req, res){
    var myText = req.query.mytext; //mytext is the name of your input box
    res.send('Your Text:' +myText);
    console.log("mytext: ", myText)

    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }
        console.log('connected as id ' + connection.threadId);

        // INSERT INTO customers ( Address )
        // VALUES
        // myText

        // ()

        // connection.query('INSERT INTO customers (Address) VALUES ', myText, function(err,res){
        // connection.query("INSERT INTO customers ('Address') VALUES " myText , function(err,res){
        // connection.query("INSERT INTO customers SET Address ? ", [myText] , function(err,res){
        connection.query('INSERT INTO customers SET ?', {Address: myText}, function (error, results, fields) {
            console.log("here");
            if(error) throw err;
            console.log("results: ", fields);
            // console.log('Last insert ID:');
        });
    });
});
app.listen(3000)