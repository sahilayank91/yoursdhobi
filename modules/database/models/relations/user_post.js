var mongoose = require('mongoose');

var UserPostSchema = new mongoose.Schema({
    //_id: Object,
    post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    follow: {type: Boolean}


}, {
    minimize: false
});

UserPostSchema.index({post: 1, user: 1}, {unique: true});

module.exports = mongoose.model('UserPostRelation', UserPostSchema);
