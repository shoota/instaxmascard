
/*
 * GET home page.
 */
var request = require('request'),
    igConf=require('../model/ig-conf.json'),
    User = require('../model/factory').User;

exports.dashboard = function(req, res){

    var ejsObj={
        title:"ダッシュボード"
    };

    // reload
    if(req.session.oauth){
        ejsObj.oauth = req.session.oauth;
        res.render('dashboard', ejsObj);
    }else{
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

        //TODO STAB HERE

        // oauth info registration
        request.post(options, function(error, response, body){
            if (!error && response.statusCode == 200) {
                req.session.oauth = body;
                ejsObj.oauth = body;
                User.updateOrCreate(body.user, function(){
                    res.render('dashboard', ejsObj);
                });
            } else {
                res.send(500);
            }
        });
    }
};