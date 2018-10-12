var mongoose = require('mongoose');
var ENUMS = require(__BASE__ + "config/enums");


var CommentSchema = new mongoose.Schema(
    {
        // _id: Object,
        post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
        user: {type: String, ref: 'User'},
        text: {type: String},
        timestamp: {type: Date},
    },
    {
        minimize: false
    }
);

CommentSchema.index({post: 1, _id: -1});
module.exports = mongoose.model('Comment', CommentSchema);
