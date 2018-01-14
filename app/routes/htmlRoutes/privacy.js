var express = require('express');
var path = require('path');
var router = express.Router();

// define the survey route
//root path is relative to where it's mounted
// router.get will assume the /survey is the root upon entry to this 
// since the app.use method in server.js is catching url/survey initially
router.get('/', function (req, res) {
  // res.send('WELCOME TO THE SURVEY PAGE')
  res.sendFile(path.join(__dirname, "../../public/privacyPolicy.html"));
});

module.exports = router