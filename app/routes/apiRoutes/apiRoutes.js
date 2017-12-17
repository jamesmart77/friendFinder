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

        var newFriend = req.body;
        // var newFriendScores=[];
        console.log(newFriend);

        // for(var i = 0; i < newFriend.scores.length; i++){
        //     console.log(newFriend.scores[i]);
        // }
        // newFriend.scores.forEach(element => {
        //     newFriendScores.push(parseInt(element));
        // });

        // newFriend.scores = newFriendScores;

        // console.log(req.body); 
      
        // friendList.push(newFriend);
      
        res.send("success");
    })

//export router as a node module
module.exports = router