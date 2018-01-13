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
//current mount is on /api/friends
router.route('/')
    .get(function (req, res) {
        db.Friend.findAll({}).then(function (dbFriends) {

            res.json(dbFriends);
        });
    })
    .post(parseUrlEncoded, function (req, res) {
        
        //global for multi-function use
        var friendMatch;


        //Function to find all friends and search for closest score match
        function getBestMatch(callback) {

            //get all friends
            db.Friend.findAll({}).then(function (dbFriends) {

                // set default values
                friendMatch = [];
                var closestRecordedVariance = 50; //default variance...will never be more than this
                var newFriendScore = req.body.score;

                //user that just submitted score
                console.log("NEW FRIEND SCORE======================\n")
                console.log("Score: " + newFriendScore)

                //compare user score to all other friends
                for (var i = 0; i < dbFriends.length; i++) {
                    console.log("FRIEND DETAILS======================\n")
                    console.log("FriendName: " + dbFriends[i].dataValues.name)
                    console.log("FriendScore: " + dbFriends[i].dataValues.score)

                    var scoreVariance = Math.abs(dbFriends[i].dataValues.score - newFriendScore);

                    console.log("ScoreVariance: " + scoreVariance)

                    //if the scoreVariance is less than previous Closest Variance, overwrite 
                    //friendMatch with new Closest Match
                    //assign new closest variance
                    if (scoreVariance < closestRecordedVariance) {
                        friendMatch = dbFriends[i];
                        closestRecordedVariance = scoreVariance;
                    }

                    //print best match after each loop
                    console.log("ClosestVariance: " + closestRecordedVariance)
                    console.log("ClosestMatch: " + JSON.stringify(friendMatch) + "\n\n")
                };

                console.log("BEST MATCH COMPLETE");
                callback();
            });
        };

        //add current user to db
        function addNewFriend() {
            db.Friend.create(req.body).then(function (dbPost) {
                res.json(friendMatch);
            });
        }

        //get all existing friends before adding new user so current isn't matched with himself
        getBestMatch(addNewFriend);

    });

//export router as a node module
module.exports = router