
/**
 * Module dependencies.
 */

var express = require('express')
    , resource = require('express-resource')
    , routes = require('./routes')
    , http = require('http')
    , path = require('path');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'ejs');
    //FIXME 独自のファビコンを設定する
//    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/xmascard', routes.index);
app.get('/xmascard/auth', require('./routes/oauth').igauth);
// TODO typo
app.get('/xmascard/dashbord', require('./routes/dashboard').dashboard);
app.resource('xmascard/cards', require('./routes/cards'));

http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
});
