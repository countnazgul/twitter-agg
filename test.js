function escapeHTML(text) {
    return text;//$('<div/>').text(text).html()
}

//linkify_entities(tweet1);

 
function linkify_entities(tweet) {
    if (!(tweet.entities)) {
        return escapeHTML(tweet.text)
    }
    
    // This is very naive, should find a better way to parse this
    var index_map = {}
    
    $.each(tweet.entities.urls, function(i,entry) {
        index_map[entry.indices[0]] = [entry.indices[1], function(text) {return "<a href='"+escapeHTML(entry.url)+"'>"+escapeHTML(text)+"</a>"}]
    })
    
    $.each(tweet.entities.hashtags, function(i,entry) {
        index_map[entry.indices[0]] = [entry.indices[1], function(text) {return "<a href='http://twitter.com/search?q="+escape("#"+entry.text)+"'>"+escapeHTML(text)+"</a>"}]
    })
    
    $.each(tweet.entities.user_mentions, function(i,entry) {
        index_map[entry.indices[0]] = [entry.indices[1], function(text) {return "<a title='"+escapeHTML(entry.name)+"' href='http://twitter.com/"+escapeHTML(entry.screen_name)+"'>"+escapeHTML(text)+"</a>"}]
    })
    
    var result = ""
    var last_i = 0
    var i = 0
    
    // iterate through the string looking for matches in the index_map
    for (i=0; i < tweet.text.length; ++i) {
        var ind = index_map[i]
        if (ind) {
            var end = ind[0]
            var func = ind[1]
            if (i > last_i) {
                result += escapeHTML(tweet.text.substring(last_i, i))
            }
            result += func(tweet.text.substring(i, end))
            i = end - 1
            last_i = end
        }
    }
    
    if (i > last_i) {
        result += escapeHTML(tweet.text.substring(last_i, i))
    }
    
    return result
}

var tweet1 = {
    "created_at": "Wed Jan 07 19:46:52 +0000 2015",
    "id": 552914285358489600,
    "id_str": "552914285358489602",
    "text": "RT @pimplomat: Is this something you'd put in your venue? http://t.co/Ug9UnFEO8D #iavm #tech #CES2015",
    "source": "<a href=\"http://www.hootsuite.com\" rel=\"nofollow\">Hootsuite</a>",
    "truncated": false,
    "in_reply_to_status_id": null,
    "in_reply_to_status_id_str": null,
    "in_reply_to_user_id": null,
    "in_reply_to_user_id_str": null,
    "in_reply_to_screen_name": null,
    "user": {
        "id": 23638187,
        "id_str": "23638187",
        "name": "IAVM HQ",
        "screen_name": "IAVMWHQ",
        "location": "Coppell, TX",
        "url": "http://www.iavm.org",
        "description": "IAVM exists to educate, advocate for and inspire venue professionals around the world.",
        "protected": false,
        "verified": false,
        "followers_count": 2315,
        "friends_count": 1244,
        "listed_count": 74,
        "favourites_count": 151,
        "statuses_count": 6279,
        "created_at": "Tue Mar 10 19:31:22 +0000 2009",
        "utc_offset": -21600,
        "time_zone": "Central Time (US & Canada)",
        "geo_enabled": false,
        "lang": "en",
        "contributors_enabled": false,
        "is_translator": false,
        "profile_background_color": "131516",
        "profile_background_image_url": "http://pbs.twimg.com/profile_background_images/168607703/IAVM_header.jpg",
        "profile_background_image_url_https": "https://pbs.twimg.com/profile_background_images/168607703/IAVM_header.jpg",
        "profile_background_tile": false,
        "profile_link_color": "990000",
        "profile_sidebar_border_color": "EEEEEE",
        "profile_sidebar_fill_color": "EFEFEF",
        "profile_text_color": "333333",
        "profile_use_background_image": false,
        "profile_image_url": "http://pbs.twimg.com/profile_images/3055763624/4cea06e73cf0136ddeae63c6423d44c9_normal.png",
        "profile_image_url_https": "https://pbs.twimg.com/profile_images/3055763624/4cea06e73cf0136ddeae63c6423d44c9_normal.png",
        "default_profile": false,
        "default_profile_image": false,
        "following": null,
        "follow_request_sent": null,
        "notifications": null
    },
    "geo": null,
    "coordinates": null,
    "place": null,
    "contributors": null,
    "retweeted_status": {
        "created_at": "Wed Jan 07 16:55:32 +0000 2015",
        "id": 552871164931227650,
        "id_str": "552871164931227650",
        "text": "Is this something you'd put in your venue? http://t.co/Ug9UnFEO8D #iavm #tech #CES2015",
        "source": "<a href=\"http://www.hootsuite.com\" rel=\"nofollow\">Hootsuite</a>",
        "truncated": false,
        "in_reply_to_status_id": null,
        "in_reply_to_status_id_str": null,
        "in_reply_to_user_id": null,
        "in_reply_to_user_id_str": null,
        "in_reply_to_screen_name": null,
        "user": {
            "id": 15440531,
            "id_str": "15440531",
            "name": "Jason Hensel",
            "screen_name": "pimplomat",
            "location": "Dallas, Texas",
            "url": "http://www.pimplomat.com",
            "description": "Award-winning journalist | Editor of Facility Manager magazine | Curator of Book & Beer | Improviser | Friend of many",
            "protected": false,
            "verified": false,
            "followers_count": 2519,
            "friends_count": 2273,
            "listed_count": 129,
            "favourites_count": 73,
            "statuses_count": 4503,
            "created_at": "Tue Jul 15 13:58:56 +0000 2008",
            "utc_offset": -21600,
            "time_zone": "Central Time (US & Canada)",
            "geo_enabled": false,
            "lang": "en",
            "contributors_enabled": false,
            "is_translator": false,
            "profile_background_color": "1A1B1F",
            "profile_background_image_url": "http://abs.twimg.com/images/themes/theme9/bg.gif",
            "profile_background_image_url_https": "https://abs.twimg.com/images/themes/theme9/bg.gif",
            "profile_background_tile": false,
            "profile_link_color": "2FC2EF",
            "profile_sidebar_border_color": "181A1E",
            "profile_sidebar_fill_color": "252429",
            "profile_text_color": "666666",
            "profile_use_background_image": true,
            "profile_image_url": "http://pbs.twimg.com/profile_images/56684607/arm_normal.JPG",
            "profile_image_url_https": "https://pbs.twimg.com/profile_images/56684607/arm_normal.JPG",
            "profile_banner_url": "https://pbs.twimg.com/profile_banners/15440531/1354122309",
            "default_profile": false,
            "default_profile_image": false,
            "following": null,
            "follow_request_sent": null,
            "notifications": null
        },
        "geo": null,
        "coordinates": null,
        "place": null,
        "contributors": null,
        "retweet_count": 1,
        "favorite_count": 0,
        "entities": {
            "hashtags": [{
                "text": "iavm",
                "indices": [66, 71]
            }, {
                "text": "tech",
                "indices": [72, 77]
            }, {
                "text": "CES2015",
                "indices": [78, 86]
            }],
            "trends": [],
            "urls": [{
                "url": "http://t.co/Ug9UnFEO8D",
                "expanded_url": "http://ow.ly/GWAdG",
                "display_url": "ow.ly/GWAdG",
                "indices": [43, 65]
            }],
            "user_mentions": [],
            "symbols": []
        },
        "favorited": false,
        "retweeted": false,
        "possibly_sensitive": false,
        "filter_level": "low",
        "lang": "en"
    },
    "retweet_count": 0,
    "favorite_count": 0,
    "entities": {
        "hashtags": [{
            "text": "iavm",
            "indices": [81, 86]
        }, {
            "text": "tech",
            "indices": [87, 92]
        }, {
            "text": "CES2015",
            "indices": [93, 101]
        }],
        "trends": [],
        "urls": [{
            "url": "http://t.co/Ug9UnFEO8D",
            "expanded_url": "http://ow.ly/GWAdG",
            "display_url": "ow.ly/GWAdG",
            "indices": [58, 80]
        }],
        "user_mentions": [{
            "screen_name": "pimplomat",
            "name": "Jason Hensel",
            "id": 15440531,
            "id_str": "15440531",
            "indices": [3, 13]
        }],
        "symbols": []
    },
    "favorited": false,
    "retweeted": false,
    "possibly_sensitive": false,
    "filter_level": "medium",
    "lang": "en",
    "timestamp_ms": "1420660012937"
};

console.log(linkify_entities(tweet1));