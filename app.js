//Variables added to require the neccesary dependencies (Express, data.json)

const express = require('express');
const app = express();
const { projects } = require('./data.json');


// This is the path module which can be used when setting the absolute path in the express.static function.
// https://expressjs.com/en/guide/using-template-engines.html

const path = require('path');

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// Middleware Set-up  
// This is middleware to access the public folder via route /static - app.use(express.static('public'))
app.use('/static', express.static(path.join(__dirname, 'public')))


// This ("index" = "/") route will render the "Home" page.  Data is passed in and used  to create & display info
app.get("/", (req, res) => {
    res.render("index", { projects })
});

// This (/about) route  will render the "About" page
app.get("/about", (req, res) => {
    res.render("about")
});

app.get("/project/:id", (req, res) => {
    let id = req.params.id;
    let project = projects[id]
    res.render("project", { project })
});


// Handle errors

app.use((req, res, next) => {
    const err = new Error("Not Found");
    err.status = 404;
    console.log("Sorry - Page Not Found!")
    next(err);
});
// Render error page
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});