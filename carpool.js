var express = require('express');
var exphbs  = require('express-handlebars');
const { header } = require('express/lib/request');
const { home } = require('nodemon/lib/utils');
require('dotenv').config();
var app = express();
var hbs = exphbs.create({ /* config */ });


app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//PORT 
app.set('port', process.env.PORT || 3000);

//static route
app.use(express.static(__dirname + '/public'));

// route for home page
app.get('/', function(req,res){
    res.render('home');
});

//route for create ride page
app.get('/create', function(req, res){
    res.render('create', {layout: 'headerBottomMenu',
    customstyle:'<link rel="stylesheet" href="/css/create.css">',
    title: 'Create a ride',
    headerTitle:'Create a ride'})
});

//route for login page
app.get('/login', function(req,res){
    res.render('login',{layout: 'logo',
    customstyle:'<link rel="stylesheet" href="/css/login.css">', 
    title: 'Login'})
});

//route for sign up page
app.get('/signup', function(req,res){
    res.render('signup',{layout: 'logo',
    customstyle:'<link rel="stylesheet" href="/css/signup.css">', 
    title: 'Sign up'})
});

//route for past rides page
app.get('/pastrides', function(req,res){
    res.render('pastRides', {layout: 'headerBottomMenu',
    customstyle: '<link rel="stylesheet" href="/css/past_rides.css">',
    title:'Past Rides',
    headerTitle: 'Past rides'})
});

//route for user's profile
app.get('/profile', function (req,res){
    res.render('profile',{layout: 'headerBottomMenu',
    customstyle: '<link rel="stylesheet" href="/css/profile.css">',
    title: 'Users Profile',
    reviewStars: '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">',
    headerTitle: 'Profile'})
});

//route for user's personal messages page
app.get('/messages', function(req,res){
    res.render('messages', {layout:'headerBottomMenu',
    customstyle:'<link rel="stylesheet" href="/css/messages.css">',
    title:'Messages',
    headerTitle:'Messages'})
})
//route for search ride page
app.get('/search', function(req,res){
    res.render('search', {layout: 'headerBottomMenu',
    customstyle : '<link rel="stylesheet" href="/css/search.css">',
    title: 'Search',
    headerTitle: 'Search for a ride'})
});

//route for found rides page
app.get('/found', function(req,res){
    res.render('ridesFound',{ layout:'headerBottomMenu',
    title:'Rides Found',
    customstyle:'<link rel="stylesheet" href="/css/upcoming_rides.css">',
    headerTitle:'Rides Found'})
})

//route for start a ride page
app.get('/start', function(req,res){
    res.render('start', {
        layout: 'headerBottomMenu',
        title:'Start a ride',
        customstyle:'<link rel="stylesheet" href="/css/start.css">',
        headerTitle: 'Start a ride'
    })
});

//route for upcoming rides page
app.get('/upcoming', function(req,res){
    res.render('upcoming',{layout: 'headerBottomMenu',
    customstyle:'<link rel="stylesheet" href="/css/upcoming_rides.css">',
    title:'Upcoming rides',
    headerTitle:"Upcoming rides"})
})

//route for ride page
app.get('/ride', function(req,res){
    res.render('ride',{layout: 'header',
    title:'Ride',
    customstyle:'<link rel="stylesheet" href="/css/ride.css">',
    headerTitle: 'Ride No',
    customJs:'<script src="/js/ride.js"></script>',
    API: process.env.API_KEY})
})

//route for end ride page
app.get('/end', function(req,res){
    res.render('end',{layout:'header',
    customstyle:'<link rel="stylesheet" href="/css/end_ride.css">',
    headerTitle:'End ride',
    title:'End ride'})
})

//route for past ride page
app.get('/pastride', function(req,res){
    res.render('pastride',{layout:'headerBottomMenu',
    customstyle:'<link rel="stylesheet" href="/css/single_past_ride.css">',
    title:"Past Ride No",
    headerTitle:"Past Ride No"})
})

//route for review page
app.get('/review',function(req,res){
    res.render('review',{layout:'header',
    customstyle:'<link rel="stylesheet" href="/css/review.css">',
    title:'Review ride',
    headerTitle:'Review ride'})
})

//route for 404
app.use(function(req,res){
    res.status(404);
    res.render('404');
});

//route for 500 
app.use(function(err,req,res,next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl+C to terminate.');
});