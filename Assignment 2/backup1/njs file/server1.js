// Module dependencies

var express    = require('express'),
    mysql      = require('mysql'),
    bodyParser = require('body-parser'),
    appRootDir = require('app-root-dir');
const path = require('path');
var formidable = require('formidable');
var json2html =  require('json-to-htmltable');

// Application initialization

var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'usama999',
    database : 'fis2'
});
connection.connect(function(error){
    if(!error){
        console.log('Successfully connected to database')
    }
        else
    {
        console.log('Error while connecting to the database')
    }
});
var app = express();


// Configuration
//app.use(bodyParser());

// Main route sends our HTML file
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/form.html'));
    });
console.log(app.method);

app.post('/submit', function(req, res) {


});
//Products made so far
app.get('/check1', function(req, res) {
    connection.query("Select * from products where Status= 'manufactured_and_shipped' ", function (error, results, fields) {
        if (error) {
            console.log("Error while performing query")
        }

        console.log(results);
        var obj = JSON.stringify(results);
        console.log(obj);
        var table = json2html(obj);
        res.write(table)
        res.end();
        // ...
    });

});
//History of Customer
    app.post('/check2', function(req, res) {

        var form = new formidable.IncomingForm();
        var field1 = [];
        new formidable.IncomingForm().parse(req).on('field', function (name, value) {   //in the event a field in the form is encountered
            field1.push(value);    //storing the field values in an array
        })
            .on('end', function () {  //in the event when all the fields are processed
                var sql = "SELECT * FROM CUSTOMERS WHERE CUSTOMERS.NAME ='?'";
                var values = [field1[0]];  //Name of the Cusotmer Entered by the User
                connection.query(sql, [values], function (error, results) { //Query to the database.
                    if(error)
                    {console.log('Errror while performing query');
                    }
                    var obj = JSON.stringify(results);
                    var table = json2html(obj);
                    res.write(table);
                    res.end();
                });

            });
    });

app.get('/check3', function(req, res) {
    connection.query("Select * from products where Status= 'in_production' ", function (error, results, fields) {
        if (error) {
            console.log("Error while performing query")
        }

        console.log(results);
        var obj = JSON.stringify(results);
        console.log(obj);
        var table = json2html(obj);
        res.write(table)
        res.end();
    });


       connection.query("Select * from Products", function (error, results, fields) {
            if (error) {
                console.log("Error while performing query")
            }

            console.log(results);
            var obj = JSON.stringify(results);
            console.log(obj);
            var table = json2html(obj);
            res.write(table)
            res.end();
            // ...
        });

        console.log(app.method);
});
/*

// Update MySQL database
app.post('/users', function (req, res) {
    connection.query('INSERT INTO customers SET ?', req.body,
        function (err, result) {
        console.log("req_body: ", req.body);
            if (err) throw err;
            res.send('User added to database with ID: ' + result.insertId);
        }
    );
});
*/
// Begin listening

app.listen(3001,function(){
    console.log("Server started");

});