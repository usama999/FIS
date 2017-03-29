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
    res.sendFile(path.join(__dirname + '/test.html'));
});
console.log(app.method);


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
                    var fieldvalues=[];
                    var form =new formidable.IncomingForm().parse(req).on('field', function (name, value) {
                        fieldvalues.push(value);
                    })
                        .on('end', function () {
                            console.log('Field Values Are:');
                            console.log(fieldvalues);
                            var sql="Select * from customers INNER JOIN Orders On Orders.id=customers.id INNER JOIN Products On Orders.Product_id=Products.Product_id WHERE Customers.Name=?" ;
                            var values = [fieldvalues[0]];
                            connection.query(sql,[values], function (error, results){
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

app.get('/check4', function(req, res) {
    connection.query("SELECT Customers. ID, Customers.Name FROM Customers INNER JOIN Orders ON Orders. ID=Customers. ID WHERE  Orders.date BETWEEN date_sub(now(),INTERVAL 1 WEEK) and now(); ",
        function (error, results, fields) {
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
});


// Begin listening

app.listen(3001,function(){
    console.log("Server started");

});