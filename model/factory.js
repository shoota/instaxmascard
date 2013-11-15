/* model factory */
var mongoose = require('mongoose'),
    cardSchema = require('./CardSchema'),
    userSchema = require('./UserSchema');

var mdb = process.env.MONGO_ENV ?
    process.env.MONGO_ENV : 'mongodb://localhost/staging';
mongoose.connect(mdb);

module.exports ={
    // name, schema, collection
    Cards: mongoose.model('Cards', cardSchema, 'cards'),
    Users: mongoose.model('Users', userSchema, 'users')
};