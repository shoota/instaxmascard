/* model factory */
var mongoose = require('mongoose'),
    cardSchema = require('./CardSchema'),
    userSchema = require('./UserSchema'),
    sequenceSchema = require('./SequenceSchema');

var mdb = process.env.MONGO_ENV ?
    process.env.MONGO_ENV : 'mongodb://localhost/staging';
mongoose.connect(mdb);

module.exports ={
    // name, schema, collection
    Card: mongoose.model('Cards', cardSchema, 'cards'),
    User: mongoose.model('Users', userSchema, 'users'),
    Sequence: mongoose.model('Sequence', sequenceSchema, 'sequence')
};