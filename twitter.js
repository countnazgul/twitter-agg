var Twit = require('twit')
var express = require('express');
var app = express();
var config = require('./config')
var mongoose = require('mongoose');
var fs = require('fs');
var async = require('async');

console.log()
mongoose.connect(config.mongoose.url);

var T = new Twit({
  consumer_key: config.twitter.consumer_key,
  consumer_secret: config.twitter.consumer_secret,
  access_token: config.twitter.access_token,
  access_token_secret: config.twitter.access_token_secret
});


var Tweet = mongoose.model('twitter', { 
    id_str: Number,
    text: String,
    created_at: String,
    profile_image_url: String,
    name: String,
    screen_name: String,
    search_term: String,
    viewed: Boolean,
    favorite: Boolean,
    blocked: Boolean
});

var search_term = 'thinkaboutme';
var terms = search_term.split(',')
var i = 0;

var stream = T.stream('statuses/filter', { track: search_term });

stream.on('tweet', function (newtweet) {
    fs.readFile('blocked.txt', function(err, data) {
        var blocks = data.toString();
        blocks = blocks.split(',');
        var blocked = false;
        async.each(blocks, function(block, callback) {
            if(newtweet.user.name.toLowerCase() === block) {
                blocked = true;
            } else {
                blocked = false;
            }    
            callback();
       }, function(err){
            async.each(terms, function(term, callback) {
                t = newtweet.text.toLowerCase();

                if(t.indexOf(term) > -1) {
                    var tweet = new Tweet({ 
                        id_str: newtweet.id_str,
                        text: newtweet.text,
                        created_at: newtweet.created_at,
                        profile_image_url: newtweet.user.profile_image_url,
                        name: newtweet.user.name,
                        screen_name: newtweet.user.screen_name,
                        search_term: term,
                        viewed: false,
                        favorite: false,
                        blocked: blocked
                    });

                    tweet.save(function (err) {
                        if (err) console.log(error);
                        i++;
                        console.log(i + ' tweets saved!');
                        callback();    
                    }); 
                } else {
                    callback();
                }

            }, function(err){
            });       
        });      
    });
});
    

app.get('/', function (req, res) {
  res.send(i.toString());
})

var server = app.listen(8001, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Server listening at http://%s:%s', host, port)
})