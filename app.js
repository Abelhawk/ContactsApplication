const express = require('express');
const path = require('path');
const router = require('express').Router();
const bodyParser = require('body-parser');
let app = express();
app.set("view engine", "pug");
const pug = require('pug');

const users = {};
let lastId = 0;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.render('index')
});

//Create new users
app.route('/users')
    .get(function (req, res) {
        res.render('users', {
            users: users
        })
    })
    .post(function (req, res) {
        let user = {
            id: lastId++,
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        };
        users[user.id] = user;
        console.log('Created user ' + user.name);
        res.render("users", {
            users: users
        });
    });

//Edit users
app.route('/users/:id')
    .get(function (req, res) {
        let userId = req.params.id;
        res.render('edit', {
            user: users[userId]
        })
    })
    .post(function (req, res) {
        let user = {
            id: req.body.id,
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        };
        users[user.id] = user;
        console.log('Updated user ' + user.name);
        res.render("users", {
            users: users
        });
    });

//Delete users
app.route('/users/:id/delete')
    .get(function (req, res) {
        let userId = req.params.id;
        delete users[userId];
        res.redirect('/users')
    });


app.listen(3000, () => {
    console.log('Listening on port 3000')
});