/* model factory */
var mongoose = require('mongoose'),
    cardSchema = require('./CardSchema');

var mdb = process.env.MONGO_ENV ?
    process.env.MONGO_ENV : 'mongodb://localhost/xcard';
mongoose.connect(mdb);

module.exports ={
    // name, schema, collection
    Cards: mongoose.model('Cards', cardSchema, 'cards')
};