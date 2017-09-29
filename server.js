const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();




app.set('view engine', 'hbs');

// use permet d utliser les middelwares
app.use(express.static(__dirname + '/public'));
app.use(function (req, res, next) {

   var now = new Date().toString();
   var log = req.method + ' ' + req.url + ' ' + ' ' + now;

   console.log(log);

   fs.appendFile('server.log', log + '\n');

      //req.url ns renvoit l url de la page sur laquelle on se trouve,
      // req.mehtod ns renvoit le type de methode http utilisé (GET, POST, ...)

   next();
});


hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', function () {
   return new Date().getFullYear();
});
hbs.registerHelper('screamIt', function (text) {
    return text.toUpperCase();
});

app.get('/',  function (req, res) {
   //res.send('<h1>hello express</h1>');
    /*
    res.send({
        name: 'Paterson',
        todo: 'build a startup'
    })
    */
    res.render('home.hbs', {
       pageTitle: ' The Home Page',
        welcomeMessage: 'welcome to the home page NoFlemmeZone',
        //currentYear: new Date().getHours()
    })
});

app.get('/about', function (req, res) {
   // render permet de render un template
    res.render('about.hbs', {
       pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', function (req, res) {
    res.send({
       errorMessage: "unable to open that page"
    });
});

app.get('/projects', function (req, res) {
    res.render('projects.hbs', {
        titre: 'nouvelle page heroku',
        content: "hallo heroku"
    })
});


app.use(function (req, res, next) {
    res.render('basic.hbs');
});




app.listen(port, function () {
    console.log('server is up in port '+port);
});