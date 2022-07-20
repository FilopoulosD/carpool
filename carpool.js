const express = require('express');
const exphbs  = require('express-handlebars');
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const session = require('express-session');
const db = require('./database').db;
const crypto = require('crypto');

db.connect(function(err){
    if (err){
      console.log(err.message);
    } else{
      console.log("Connected");
    }
})

//app start
const app = express();
const hbs = exphbs.create({ /* config */ });

//Body Parser use from application
app.use(bodyParser.urlencoded({ extended: false }));

//engine set
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

//PORT 
app.set('port', process.env.PORT || 3000);

//static route
app.use(express.static(__dirname + '/public'));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

// route for home page
app.get('/', function(req,res){
    if (req.session.loggedin){
        db.query(`SELECT name FROM Users WHERE email = '${req.session.email}';`, function(err,result){
            if(err){
                throw (err);
            }else{
                profileName = result[0].name;
                res.render('home',{layout: 'main',
                profileName: profileName
                });
            }
        })
    }else{
        res.redirect('/login');
    }
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
    if (req.session.loggedin){
        res.redirect('/')
    }else{
        res.render('login',{layout: 'logo',
        customstyle:'<link rel="stylesheet" href="/css/login.css">', 
        title: 'Login'})
    }
    
});

app.post('/login', async function(req,res){
    
    var email = req.body.email;
    var password = req.body.password;
    db.query( `SELECT email, password FROM Users WHERE email = '${email}';`,async function(err, results){
        if (err){
            throw(err)
        };
        const matching = await bcrypt.compare(password, results[0].password)
        if (!matching){
            console.log('Wrong email or password!');
            res.redirect('./login');
        }
        if (matching){
            console.log('Login sucessful');
            req.session.loggedin = true;
			req.session.email = email;
            res.redirect('/');
        }
        
    });
});

//route for sign up page
app.get('/signup', function(req,res){
    if(req.session.loggedin){
        res.redirect('/');
    }else{
        res.render('signup',{layout: 'logo',
        customstyle:'<link rel="stylesheet" href="/css/signup.css">', 
        title: 'Sign up'})
    }
    
});

app.post('/signup', async function(req,res){
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var password = req.body.password;
    var birthdate = req.body.birthdate;
    //random number generator
    var uuid = crypto.randomInt(100000,1000000);
    //password hashing
    var hashedPassword = await bcrypt.hash(password, 10);
    db.query(`SELECT COUNT(*) AS cnt FROM Users WHERE email = '${email}';`, function(err,result){
        if (err) {
            console.log(err);
        }else{
            if (result[0].cnt!==0){
                res.redirect('/signup');
                console.log("email already on datatbase");
            }else{
                db.query(`INSERT INTO Users VALUES (${uuid},'${name}', '${email}',${phone},0,'${hashedPassword}','${birthdate}', NULL);`, function(err){
                    if(err){
                        console.log(err);
                    }else{
                        console.log("Succesfull registration");
                        res.redirect('/login');
                    }      
                });
            }
        }   
    });
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
    db.query(`SELECT name, birthdate, email FROM Users WHERE email = '${req.session.email}';`, function(err,result){
        if (err){
            throw (err);
        }
        else{
            fullName = result[0].name;
            date= result[0].birthdate;
            month = date.getUTCMonth() +1;
            day = date.getUTCDate();
            year = date.getUTCFullYear();
            birthday = day + '/' + month + '/' + year;
            email = result[0].email;
            res.render('profile',{layout: 'headerBottomMenu',
            customstyle: '<link rel="stylesheet" href="/css/profile.css">',
            title: 'Users Profile',
            reviewStars: '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">',
            headerTitle: 'Profile',
            name: fullName, 
            birthday: birthday,
            email: email
            });
        }
    });
});

//route for user's personal messages page
app.get('/messages', function(req,res){
    res.render('messages', {layout:'headerBottomMenu',
    customstyle:'<link rel="stylesheet" href="/css/messages.css">',
    title:'Messages',
    headerTitle:'Messages'})
})

//route for chat page
app.get('/messages/user', function(req,res){
    res.render('pm', {layout:'headerBottomMenu',
    customstyle:'<link rel="stylesheet" href="/css/pm.css">',
    title:'User',
    headerTitle:'User Name'})
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

//server listen on port
app.listen(app.get('port'), function(){
    console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl+C to terminate.');
});