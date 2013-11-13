var mongoose = require('mongoose')
    , Schema = mongoose.Schema;

/*
 * Schema Define
 */
var CardSchema = new Schema({
    source: Object
});

/**
 *
 * @param size
 * @param callback
 * @returns {*}
 */
CardSchema.statics.findAny = function(size, callback){
    var opts={};
    return this.find({},null,opts,callback);
};


module.exports = CardSchema;