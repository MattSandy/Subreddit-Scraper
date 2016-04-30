var http = require('http');
var https = require('https');
var fs = require('fs');
var url = 'https://www.reddit.com/r/SandersForPresident/.json';

https.get(url, function(res){
    var body = '';

    res.on('data', function(chunk){
        body += chunk;
    });

    res.on('end', function(){
        var response = JSON.parse(body);
        for(var i=0;i<response.data.children.length;i++) {
            var line = response.data.children[i].data.author + ',' + response.data.children[i].data.id  + ',' +
                response.data.children[i].data.created + ',' + response.data.children[i].data.num_comments + ',' +
                response.data.children[i].data.score + ',' + response.data.children[i].data.stickied;
            console.log(line);
        }

    });
}).on('error', function(e){
    console.log("Got an error: ", e);
});