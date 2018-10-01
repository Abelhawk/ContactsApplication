const express = require('express');
const userModel = require('./models/users.js');
const path = require('path');
const router = require('express').Router();
const bodyParser = require('body-parser');
let app = express();
app.set("view engine", "pug");
const pug = require('pug');
const mongoose = require('./config/mongoose.js');

const users = {};
let lastId = 0;

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.render('index')
});

//Define user resource
app.route('/users')
    .get(function (req, res) {
        userModel.find({}, function (err, users) {
            if (err) throw err;
            res.render('users', {
                users: users
            });
        });
    })
    .post(function (req, res) {
        let user = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        };
        let newUser = userModel(user);
        newUser.save(function (err) {
            if (err) throw err;
            console.log('Created user ' + user.name);
            userModel.find({}, function (err, users) {
                if (err) throw err;
                res.render('users', {
                    users: users
                });
            });
        });
    });

//Edit users
app.route('/users/:_id')
    .get(function (req, res) {
        userModel.findOne({_id: req.params._id}, function (err, user) {
            if (err) throw err;
            res.render('edit', {
                user: user
            });
        });
    })
    .post(function (req, res) {
        let user = {
            name: req.body.name,
            email: req.body.email,
            age: req.body.age
        };
        userModel.update({_id: req.params._id}, user, function (err, user) {
            if (err) throw err;
            userModel.find({}, function (err, users) {
                if (err) throw err;
                res.render('users', {
                    users: users
                });
            });
        });
    });


//Delete users
app.route('/users/:_id/delete')
    .get(function (req, res) {
        userModel.deleteOne({_id: req.params._id}, function (err) {
            if (err) throw err;
            userModel.find({}, function (err, users) {
                if (err) throw err;
                res.render('users', {
                    users: users
                });
            });
        });
    });


app.listen(3000, () => {
    console.log('Listening on port 3000')
});