'use strict';
var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public')); // serve static files

app.listen(process.env.PORT);
console.log('Express server listening on port', process.env.PORT);
