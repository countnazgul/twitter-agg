var express = require('express');
var app = express();
// var passport = require('passport')
//   , TwitterStrategy = require('passport-twitter').Strategy;
var session = require('express-session');
var fs = require('fs');
var cookieParser = require('cookie-parser');
var config = require('./config');

var mongoose = require('mongoose');
mongoose.connect(config.mongoose.url);

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true
}));
app.use('/static', express.static(__dirname + '/static'));
app.use(cookieParser());

// var tokenC, tokenSecretC;
// passport.use(new TwitterStrategy({
//     consumerKey: 'kiaHq5RJizlYCSoXj0lvxZQQb',
//     consumerSecret: 'yOdRdkKqNsHraLpDVi1hEPpRdBP6XwJjVxFmR5BKtg6naG1bdC',
//     callbackURL: "http://broken-biology.codio.io:8000/auth/twitter/callback"
//   },
//   function(token, tokenSecret, profile, done) {
//     //console.log(profile);
//     console.log(tokenSecret);
//     console.log(token);
//     tokenSecretC = tokenSecret;
//     tokenC = token;
//     return done(profile);
//     //User.findOrCreate({ twitterId: profile.id }, function (err, user) {
//     //  return done(err, user);
//     //});
//   }
// ));


var Tweet = mongoose.model('twitter', { 
    id_str: Number,
    text: String,
    created_at: String,
    profile_image_url: String,
    name: String,
    screen_name: String,
    search_term: String,
    favorite: Boolean,
    viewed: Boolean,
    blocked: Boolean
});

app.get('/retweet', function (req, res) {
    console.log(tokenC);
    console.log(tokenSecretC)
    var T = new Twit({
        consumer_key:         'typVF0rWNF7tLZJ6ezD3JogIm'
      , consumer_secret:      'dH6C684CbaNCNGH7Obfi1XQxEsBljw8pq4PG1lGxsaSymOM9qS'
      , access_token:         tokenC
      , access_token_secret:  tokenSecretC
    });
    
     T.post('statuses/retweet/:id', { id: '553279100706893800' }, function (err, data, response) {
         console.log(err);
         //console.log(response);
         console.log(data);
         res.send('ok');
     });    
});

//app.get('/auth/twitter',
//  passport.authenticate('twitter'));

// app.get('/auth/twitter',
//   passport.authenticate('twitter'),
//   function(req, res){
//     console.log(res);
//     // The request will be redirected to Twitter for authentication, so this
//     // function will not be called.
//   });

// app.get('/auth/twitter/callback', 
//   passport.authenticate('twitter', { failureRedirect: '/' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.get('/searchterms', function (req, res) {
  res.send(['qlikview', 'CES2015'])
})

app.get('/block/:name', function (req, res) {
    var name = req.param('name').toLowerCase();
    fs.appendFile('blocked.txt', ','+name, function (err) {
        res.send('ok');
    });
})

app.get('/viewed/:id', function (req, res) {
    var id = req.param('id');

    var query = {"_id": id};
    var update = {viewed : true};
    //var options = {new: true};
    Tweet.findOneAndUpdate(query, update, /*options,*/ function(err, tweet) {
      if (err) {
        console.log('got an error');
      } else {
          //console.log(tweet)
          res.send(' ok');
      }
      // at this point person is null.
    });
    
})

app.get('/setfav/:id', function (req, res) {
    var id = req.param('id');

    var query = {"_id": id};
    var update = {favorite : true};

    Tweet.findOneAndUpdate(query, update, /*options,*/ function(err, tweet) {
      if (err) {
        console.log('got an error');
      } else {
          console.log(tweet);
          res.send(' ok');
      }
    });
})

app.get('/removefav/:id', function (req, res) {
    var id = req.param('id');

    var query = {"_id": id};
    var update = {favorite : false};

    Tweet.findOneAndUpdate(query, update, /*options,*/ function(err, tweet) {
      if (err) {
        console.log('got an error');
      } else {
          res.send(' ok');
      }
    });
})

app.get('/getfav/:term', function (req, res) {
    var term = req.param('term');
    var q = Tweet.find({favorite : true, search_term : term}).sort('-id_str');
        
    q.exec(function(err, docs) {
        res.send(docs);
    });
})

app.get('/twitter/:term/:id', function (req, res) {
    var id = req.param('id');
    var term = req.param('term').toLowerCase();
    
    if(id > 0) {
        var q = Tweet.find({search_term : term, viewed: false, blocked: {$ne: true} ,id_str: { $gt: id }}).sort('-id_str');        
    } else {
        var q = Tweet.find({search_term : term, viewed: false, blocked: {$ne: true}}).sort('-id_str');//.limit(100);        
    }        
    
    q.exec(function(err, docs) {
        res.send(docs);
    });
})

var server = app.listen(8000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Server listening at http://%s:%s', host, port)
})