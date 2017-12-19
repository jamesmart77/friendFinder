var express = require('express');
var path = require('path');
var friendList = require('../../data/friends.js');

//create Router instance by invoking method
var router = express.Router();

var bodyParser = require("body-parser");
var parseUrlEncoded = bodyParser.urlencoded({
    extended: false
});



//root path is relative to where it's mounted -- server.js
router.route('/')
    .get(function (req, res) {
        // res.send('WELCOME TO THE SURVEY PAGE')
        res.json(friendList);
    })
    .post(parseUrlEncoded, function (req, res) {
        // res.send('WELCOME TO THE SURVEY PAGE')
        //res.sendFile(path.join(__dirname, "../../public/survey.html"));

        //declare and assign object posted from client
        var newFriend = req.body;

        //declare new variable to convert to array
        var newFriendScores = [];

        //loop through score string, convert to Integer, add to array
        for (var i = 0; i < newFriend.scores.length; i++) {
            newFriendScores.push(parseInt(newFriend.scores[i]));
        }

        //overwrite string values with new array
        newFriend.scores = newFriendScores;

        //add newFriend object to friend.js file
        friendList.push(newFriend);

        res.send("success");
    })

//export router as a node module
module.exports = router