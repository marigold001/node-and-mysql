var express = require('express')
var app = express()
var mysql = require('mysql')

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'users'
})

connection.connect()
connection.query("SELECT * FROM users", (request, data) => {
    app.get('/', function(req, res) {
        res.send("Go to path /users for information on all users and path /users/1 or /users/2 etc. for information about a single user")
    })
    app.get('/users', function(req, res) {
        var allUsers = ''
        for(let i = 0; i < data.length; i++) {
            allUsers += data[i].name + ' ' + data[i].surname + ' ' + data[i].email + '<br>';
        }
        res.send(allUsers)
    })
    app.get('/users/:id', function (req, res) {
        let id = req.params.id;
        let userInfo = data[id].name + " " + data[id].surname + " " + data[id].email;
        res.send(userInfo);
    })
})


app.listen(3000, function() {
    console.log("Connected")
})