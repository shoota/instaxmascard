var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

/*
 * Schema Define
 */
var CardSchema = new Schema({
    card_id     : Number,  // TODO autoincrement
    user_name   : String,
    source      : Object,
    file_path   : String,
    created     : {type: Date, default: Date.now()}
});

module.exports = CardSchema;