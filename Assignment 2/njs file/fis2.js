

var mysql      = require('mysql');
var apps = require('app.js')
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'usama999',
    database:'fis2'
});

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }

    console.log('connected as id ' + connection.threadId);
});