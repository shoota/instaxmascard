var mongoose = require('mongoose')
    , Schema = mongoose.Schema
    , sequence = require('./factory').Sequence;

/*
 * Schema Define
 */
var CardSchema = new Schema({
    card_id     : Number,
    user_name   : String,
    source      : Object,
    file_path   : String,
    created     : {type: Date, default: Date.now()}
});

module.exports = CardSchema;