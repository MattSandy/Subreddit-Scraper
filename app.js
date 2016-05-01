var http = require('http');
var https = require('https');
var fs = require('fs');
fs.writeFile('posts.csv', 'Author,ID,Post Date,Comments,Score,Stickied,Pull,Subreddit\n', function(){console.log('done')});
fs.writeFile('users.csv', 'Author,Author Date\n', function(){console.log('done')});


scrape_hot("",1,"The_Donald");
scrape_hot("",1,"SandersForPresident");
scrape_hot("",1,"hillaryclinton");
scrape_hot("",1,"circlejerk");
scrape_hot("",1,"Showerthoughts");
scrape_hot("",1,"TIL");
scrape_hot("",1,"aww");
function scrape_hot(after,page,subreddit) {
    var url = "https://www.reddit.com/r/" + subreddit + "/.json?after=" + after;
    https.get(url, function(res){
        var body = '';

        res.on('data', function(chunk){
            body += chunk;
        });

        res.on('end', function(){
            try {
                var response = JSON.parse(body);
                for(var i=0;i<response.data.children.length;i++) {
                    var date_formatted = format_date(response.data.children[i].data.created);
                    var line = response.data.children[i].data.author + ',' + response.data.children[i].data.id + ',' +
                        response.data.children[i].data.created + ',' + response.data.children[i].data.num_comments + ',' +
                        response.data.children[i].data.score + ',' + response.data.children[i].data.stickied + ',' +
                        'hot,' + subreddit + "\n";
                    console.log(line);
                    scrape_user(response.data.children[i].data.author);
                    fs.appendFile('posts.csv', line, function (err) {

                    });
                }
                if(page<40) {
                    scrape_hot(response.data.after,page+1,subreddit);
                }
            } catch (err) {
                scrape_hot(after,page,subreddit);
            }
        });
    }).on('error', function(e){
        console.log("Got an error: ", e);
    });
}
function scrape_user(user) {
    var url = "https://www.reddit.com/user/" + user + "/about.json";
    https.get(url, function(res){
        var body = '';

        res.on('data', function(chunk){
            body += chunk;
        });

        res.on('end', function(){
            try {
                var response = JSON.parse(body);
                var line = user + "," + format_date(response.data.created) + "\n";
                fs.appendFile('users.csv', line, function (err) {
                    //success
                });
            } catch (err) {
                scrape_user(user);
            }
        });
    }).on('error', function(e){
        console.log("Got an error: ", e);
    });
}
function format_date(date) {
    var yyyy = date.getFullYear().toString();
    var mm = (date.getMonth()+1).toString(); // getMonth() is zero-based
    var dd  = date.getDate().toString();
    return yyyy + "-" + (mm[1]?mm:"0"+mm[0]) + "-" + (dd[1]?dd:"0"+dd[0]); // padding
}
//https://www.reddit.com/r/The_Donald/new/.json?count=25&after=t3_4h3czf