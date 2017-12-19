var express = require('express');
var homeRoute = require('./app/routes/htmlRoutes/homeRoute.js');
var surveyRoute = require('./app/routes/htmlRoutes/surveyRoute.js');
var apiRoute = require('./app/routes/apiRoutes/apiRoutes.js');

var app = express();
var PORT = process.env.PORT || 3000;

//mounting exported node modules routes
app.use('/', homeRoute);
app.use('/survey', surveyRoute);
app.use('/api/friends', apiRoute);


app.listen(PORT, function(){
    console.log("app listening on " + PORT);
});