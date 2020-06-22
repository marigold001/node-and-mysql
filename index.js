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
    console.log(data)
    app.get('/', function(req, res) {
        res.send("path /users for information on all users, path /users/1 for information about a single user")
    })
    app.get('/users', function(req, res) {
        var allUsers = ''
        for(let i = 0; i < data.length; i++) {
            allUsers += data[i].name + ' ' + data[i].surname + ' ' + data[i].email + ' '
        }
        res.send(allUsers)
    })
    app.get('/users/1', function (req, res) {
        res.send(data[1])
    })
})
app.listen(3000, function() {
    console.log("Connected")
})