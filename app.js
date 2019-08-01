//
//Variables added to require the neccesary dependencies (Express, data.json)


const express = require('express');
const app = express();

//Require data.json
const { projects } = require('./data.json');


// This is the path module which can be used when setting the absolute path in the express.static function.
// https://expressjs.com/en/guide/using-template-engines.html
// acquire path module, use to join directory of project(__dirname) with views folder, set views path

const path = require('path');
app.set('views', path.join(__dirname, 'views'));

// Middleware Set-up  
// Set "view engine" to "pug"
app.set('view engine', 'pug');


// This is middleware to access the public folder via route /static - app.use(express.static('public'))
// To use multiple static assets directories, call the express.static middleware function multiple times:
// Used a static route and the express.static method to serve files in public folder
//app.use('/static', express.static('public'))
app.use('/static', express.static(path.join(__dirname, 'public')))

// The fs module provides useful functionality to access and interact with the file system.
// This will read the data.json file text, parse and convert it to JSON object instance
// https://stackoverflow.com/questions/35389060/read-json-file-content-with-require-vs-fs-readfile
// var json = JSON.parse(require('fs').readFileSync('path/test.json', 'utf8'));
const fs = require("fs");
const dataFile = fs.readFileSync('data.json', 'utf8');
const dataJson = JSON.parse(dataFile);

// This ("index" = "/") route will render the "Home" page
app.get('/', (req, res) => {
    res.render('index', { projects })
});

// This (/about) route  will render the "About" page
app.get('/about', (req, res) => {
    res.render('about')
});

//Handle errors

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    console.log("Page Not Found!")
    next(err);
});
// render error page
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
    console.log(err.status);
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});


// // define route for view Project page at /projects/:id
// app.get('/projects/:id', (req, res, next) => {

// //Go through this code and catch any errors
//     try {
//         //console.log(dataJson.projects[parseInt(req.params.id)]);
//         res.locals.project = dataJson.projects[parseInt(req.params.id)]; //param ID is string, have to cast as int
//         res.render('project');
//         //res.send("You are asking for id#" + req.params.id);
//     }
//     catch (e) {
//         next(new Error('Request could not be fulfilled'));
//     }
// });


// const port = 3000;
// app.get('/', (req, res) => res.send('Hello World!'))
// app.listen(port, () => console.log(`Example app listening on port ${port}!`))