var express = require('express');
var path = require('path');
var friendList = require('../../data/friends.js');

//create Router instance by invoking method
var router = express.Router();

var bodyParser = require("body-parser");
var parseUrlEncoded = bodyParser.urlencoded({ extended: false });



//root path is relative to where it's mounted -- server.js
router.route('/')
    .get(function (req, res) {
        // res.send('WELCOME TO THE SURVEY PAGE')
        res.json(friendList);
    })
    .post(parseUrlEncoded, function (req, res) {
        // res.send('WELCOME TO THE SURVEY PAGE')
        //res.sendFile(path.join(__dirname, "../../public/survey.html"));
    })

//export router as a node module
module.exports = router