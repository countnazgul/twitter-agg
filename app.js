var express = require('express');
var app = express();

var mongoose = require('mongoose');
mongoose.connect('mongodb://twitter:!pr0tect0r!@paulo.mongohq.com:10024/Monitoring');

app.use('/static', express.static(__dirname + '/static'));

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


app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

app.get('/searchterms', function (req, res) {
  res.send(['qlikview', 'CES2015'])
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

app.get('/twitter/:term', function (req, res) {
    var term = req.param('term');
    var q = Tweet.find({search_term : term}).sort('-id_str').limit(100);
    
    q.exec(function(err, docs) {
        res.send(docs);
    });
})

var server = app.listen(8000, function () {
  var host = server.address().address
  var port = server.address().port
  console.log('Server listening at http://%s:%s', host, port)
})