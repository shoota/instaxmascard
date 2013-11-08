
/*
 * GET home page.
 */
//var instagram = require('instagram-node-lib'),
var request = require('request'),
    igConf=require('../model/ig-conf.json');
//
//instagram.set('client_id', igConf.client_id);
//instagram.set('client_secret', igConf.client_secret);
//instagram.set('redirect_uri', igConf.redirect_uri);

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

    request.post(options, function(error, response, body){
        if (!error && response.statusCode == 200) {

            var ejsObj={
                title:"ダッシュボード",
                oauth: body
            };
            res.render('dashboard', ejsObj);
        } else {
            console.log('error: '+ response.statusCode);
            res.send(500,'auth error'+body);
        }
    });
};