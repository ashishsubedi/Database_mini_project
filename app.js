var express = require('express');
var app = express();

const indexRoute = require('./routes/index')
const adminRoute = require('./routes/admin')
const transactionRoute = require('./routes/transactionRoute')

// set the view engine to ejs
app.set('view engine', 'ejs');

// use res.render to load up an ejs view file

// index page 
app.use('/', indexRoute);
app.use('/transaction',transactionRoute);
app.use('/admin',adminRoute);

app.listen(3000);
console.log('8080 is the magic port');