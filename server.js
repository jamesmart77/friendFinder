var express = require('express');
var homeRoute = require('./app/routes/htmlRoutes/homeRoute.js');
var surveyRoute = require('./app/routes/htmlRoutes/surveyRoute.js');
var apiRoute = require('./app/routes/apiRoutes/apiRoutes.js');
var path = require('path');

var app = express();
var PORT = process.env.PORT || 3000;

// Requiring our models for syncing
var db = require("./app/models");

//make all files available in Public folder
app.use(express.static(path.join(__dirname, 'app/public')))

//mounting exported node modules routes
app.use('/', homeRoute);
app.use('/survey', surveyRoute);
app.use('/api/friends', apiRoute);


// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({
    force: true
}).then(function () {
    app.listen(PORT, function () {
        console.log("App listening on PORT " + PORT);
    });
});