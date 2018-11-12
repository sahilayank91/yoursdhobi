var mongoose = require('mongoose');
var ENUMS = require(__BASE__ + "config/enums");

var FeedbackSchema = new mongoose.Schema({
    _id: String,
    created_at: {type: Date, default: new Date()},
    comment:{type:String},
    reaction:{type:String},
    userid: {type: String, ref: 'User'},
    minimize: false,

});
FeedbackSchema.index({_id: 1, created_at: -1});

module.exports = mongoose.model('Feedback', FeedbackSchema);
