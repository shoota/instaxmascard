exports.igauth = function(req, res){
    var igConf=require('../model/ig-conf.json');

    var oauthURI = 'https://api.instagram.com/oauth/authorize/' +
        '?client_id=' + igConf.client_id +
        '&redirect_uri=' + igConf.redirect_uri +
        '&response_type=code';
    res.redirect(301, oauthURI);
};