var express = require('express');
var path = require('path');
var friendList = require('../../data/friends.js');

var db = require("../../models");

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

        /* ================================================
        COMPARE NEW USER TO EXISTING USERS FOR CLOSEST MATCH
        =================================================*/

        /* LOOP THRU EACH EXISTING USER
           RECORD COMPARATIVE SCORE
           FIND LOWEST COMPARATIVE SCORE
           GET CORRESPONDING USER INFO
           RETURN INFO TO CLIENT */

        // set default values
        var FriendMatch = 0;
        var closestRecordedVariance = 10000; //default variance...will never be more than this
        
        //current user score sum
        var newFriendScoreSum = newFriend.scores.reduce(getSum);

        for (var i = 0; i < friendList.length; i++) {
            //sum score of iterated friend object from friend.js
            let existingFriendScoreSum = friendList[i].scores.reduce(getSum);
            let scoreVariance = Math.abs(existingFriendScoreSum - newFriendScoreSum);

            //assess if new user score is closer than previous existing users iteration validation
            if (scoreVariance < closestRecordedVariance) {
                closestRecordedVariance = scoreVariance;
                
                //record closest found friend score
                FriendMatch = i;
            }

        };
        //add newFriend object to friend.js file
        friendList.push(newFriend);

        console.log("=======================\n");
        console.log("MATCH RESULTS");
        console.log(friendList[FriendMatch].name + " -- " + friendList[FriendMatch].scores.reduce(getSum));
        console.log(newFriend.name + " -- " + newFriendScoreSum);
        console.log("CLOSEST VARIANCE: " + closestRecordedVariance);

        res.send(friendList[FriendMatch]);
    })

//pass in array of numbers
//return sum of array
function getSum(total, num) {
    return total + num;
}

//export router as a node module
module.exports = router