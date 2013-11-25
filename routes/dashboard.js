
/*
 * GET home page.
 */
var request = require('request'),
    igConf=require('../model/ig-conf.json'),
    User = require('../model/factory').Users;

exports.dashboard = function(req, res){

    var CODE = req.query.code;

    var options = {
        uri: 'https://api.instagram.com/oauth/access_token',
        form: {
            client_id:igConf.client_id,
            client_secret: igConf.client_secret,
            grant_type:"authorization_code",
            redirect_uri:igConf.redirect_uri,
            code: CODE
        },
        json: true
    };

    // oauth process
    // TODO capsuling to model
    request.post(options, function(error, response, body){
        if (!error && response.statusCode == 200) {
            var ejsObj={
                title:"ダッシュボード",
                oauth: body
            };

            res.render('dashboard', ejsObj);

            //FIXME bugs
//            User.updateOrCreate(body.user, function(){
//                res.render('dashboard', ejsObj);
//            });
        } else {
            console.log('error: '+ response.statusCode);
            // TODO error handling
            res.send(500,'auth error'+body);
        }
    });

};