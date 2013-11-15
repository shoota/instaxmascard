var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

/**
 * User
 * @type {Schema}
 */
var UserSchema = new Schema({
    user_id: String,
    user_name: String,
    picture: String
});

/**
 * ユーザ情報を登録する。
 * すでに登録されている場合はすぐさまcallbackを実行し、初めての場合はsaveする。
 * @param userProperty instagram auth info.
 * @param callback callback
 */
UserSchema.statics.updateOrCreate = function(userProperty, callback){
    var user = this;
    user.findOne({user_id: userProperty.id}, function(err, doc){
        if(err) {
            callback(err);
        } else if(doc){
            callback(null, doc);
        } else {
            // create new user
            var newUser = new user({
                user_id: userProperty.id,
                user_name: userProperty.username,
                picture: userProperty.profile_picture
            });
            newUser.save(function(err){
                if(err){
                    callback(err);
                } else {
                    callback(null, newUser)
                }
            });
        }
    });
};