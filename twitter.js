var Twit = require('twit')
var express = require('express');
var app = express();
var config = require('./config')
var mongoose = require('mongoose');

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
    viewed: Boolean
});

// T.get('search/tweets', { q: 'qlikview since_id:551875079588806657', count: 1 }, function(err, data, response) {
//     if (err) console.log(err)

//     for(var i = 0; i < 1; i++) { //data.statuses.length
//         var twit = data.statuses[i];
//         console.log(twit.id_str)
//         console.log(twit.text)
//         console.log(twit.created_at)
//         console.log(twit.user.profile_image_url)
//         console.log(twit.user.name)
//         console.log(twit.user.screen_name)
//     }
// })

//https://twitter.com/QlikView/status/551388771196088321
var search_term = 'qlikview';
var i = 0;

//var stream = T.stream('statuses/filter', { track: search_term })
// stream.on('tweet', function (newtweet) {
        
//         var tweet = new Tweet({ 
//             id_str: newtweet.id_str,
//             text: newtweet.text,
//             created_at: newtweet.created_at,
//             profile_image_url: newtweet.user.profile_image_url,
//             name: newtweet.user.name,
//             screen_name: newtweet.user.screen_name,
//             search_term: search_term,
//             viewed: false
//         });
    
//         tweet.save(function (err) {
//           if (err) console.log(error);
//             i++;
//             console.log(i + ' tweets saved!');
//         });        
        
// })

app.get('/', function (req, res) {
  res.send(i.toString());
})

var server = app.listen(8001, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Server listening at http://%s:%s', host, port)
})