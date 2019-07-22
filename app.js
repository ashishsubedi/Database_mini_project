var express = require('express');
var app = express();
var cors = require('cors');
var cookieParser = require('cookie-parser')

const con = require('./database/connection')

const indexRoute = require('./routes/index')
const employeeRoute = require('./routes/employee')
const adminRoute = require('./routes/admin')

// set the view engine to ejs
app.set('view engine', 'ejs');


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())


con.connect((err) => {
    if (err) console.log(err);
    else
        console.log("Connected!");
});
// index page 
app.use('/', indexRoute);
app.use('/admin', adminRoute);
app.use('/employee', employeeRoute);

app.listen(3000);
console.log('8080 is the magic port');