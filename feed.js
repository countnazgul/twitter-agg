var FeedParser = require('feedparser')
  , request = require('request')
  , fs = require('fs');

var mongoose = require('mongoose');
mongoose.connect('mongodb://twitter:!pr0tect0r!@paulo.mongohq.com:10024/Monitoring');

var Feed = mongoose.model('feed', { 
    guid: String,
    title: String,
    description: String,
    summary: String,
    date: String,
    link: String,
    source: String,
    viewed: Boolean    
});


//http://www.quora.com/QlikView/rss
//http://stackoverflow.com/feeds/tag?tagnames=qlikview&sort=newest

var url = "http://stackoverflow.com/feeds/tag?tagnames=qlikview&sort=newest";
var pubFormat = "atom:published";
var dateFormat = "";
//var url = "http://www.quora.com/QlikView/rss";
//var pubFormat = "rss:pubdate";
//var dateFormat = "";

var req = request(url)
  , feedparser = new FeedParser(); //[options]

req.on('error', function (error) {
  // handle any request errors
});
req.on('response', function (res) {
  var stream = this;

  if (res.statusCode != 200) return this.emit('error', new Error('Bad status code'));

  stream.pipe(feedparser);
});


feedparser.on('error', function(error) {
  // always handle errors
});
feedparser.on('readable', function() {
  // This is where the action is!
  var stream = this
    , meta = this.meta // **NOTE** the "meta" is always available in the context of the feedparser instance
    , item;
  var i = 0;
    
  while (item = stream.read()) {
      
        var feed = new Feed({ 
            guid: item.guid,
            title: item.title,
            description: item.description,
            summary: item.summary,
            date: item.date,
            link: item.link,
            source: 'Stackoverflow',
            viewed: false
        });
    
        feed.save(function (err) {
          if (err) console.log(error);
            i++;
            console.log(i + ' feeds saved!');
        });        
      
    //var published = item[pubFormat]
    //console.log(published["#"]);
  }
});