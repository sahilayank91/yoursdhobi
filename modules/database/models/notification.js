var mongoose = require('mongoose');
var ENUMS = require(__BASE__ + "config/enums");


var NotificationSchema = new mongoose.Schema(
    {
        _id:{type:String},
        post: {type: mongoose.Schema.Types.ObjectId, ref: 'Post'},
        user: {type: String, ref: 'User'},
        text: {type: String},
        type:{type:String,enum:['Suggestion','Report','Like']},
        create_time: {type: Date, required: true},
    },
    {
        minimize: false
    }
);

NotificationSchema.index({post: 1, _id: -1});
module.exports = mongoose.model('Notification', NotificationSchema);
