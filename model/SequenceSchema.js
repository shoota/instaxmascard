var mongoose = require('mongoose')
    , Schema = mongoose.Schema;


var SequenceSchmma = new Schema({
    _id: String,
    seq: Number
});

/**
 *
 * @param key           sequence name
 * @param callback      callback function
 * @returns {*|null}
 */
SequenceSchmma.statics.getCardNumber = function(callback){
    var key = "card_id";

    return this.collection.findAndModify(
        { _id: key},  // query
        [],           // sort
        { $inc:{seq:1}}, // increment command
        { new:true, unsert: true},
        callback
    );
};

module.exports=SequenceSchmma;