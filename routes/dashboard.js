
/*
 * GET home page.
 */

var instagram = require('instagram-node-lib'),
    igConf=require('../model/ig-conf.json');

instagram.set('client_id', igConf.client_id);
instagram.set('client_secret', igConf.client_secret);
//instagram.set('redirect_uri', igConf.redirect_uri);

exports.dashboard = function(req, res){
    instagram.oauth.ask_for_access_token({
        request: req,
        response: res,
        redirect: igConf.redirect_uri,
        complete: function(params, response){
            console.log('success');
            response.send(params['access_token']);
            //response.render('dashBoard', {access_token: params['access_token']});
            response.end();
        },

        error: function(errMsg, errObj, caller, response){
            console.log(errMsg);
            response.send(406);
        }

    });
    return null;

};