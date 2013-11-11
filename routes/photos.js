module.exports={
    //ユーザの画像を取得して返す
   index: function(req, res){
       var request = require('request');
       var user_id      = req.query.user_id;
       var access_token = req.query.access_token;
       var max_id       = req.query.max_id;

       console.log(user_id  +'//' + access_token+'//'+max_id);

       var apiURI = 'https://api.instagram.com/v1/users/'+user_id +'/media/recent';
       var reqOpt = {
           uri: apiURI,
           form: {access_token: access_token},
           json:true
       };
       if(max_id)reqOpt.form.max_id=max_id;

       console.log(apiURI);
       console.log(require('util').inspect(reqOpt));


       request.get(reqOpt, function(err, resp, body){

           console.log("STATUS =====>" + resp.statusCode);

           if (!err && resp.statusCode == 200) {
               res.send(body);
           } else {
               // TODO error handling
               res.send(500);
           }
       });
   }
};