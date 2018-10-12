var mongoose = require('mongoose');
var POST_TYPES = require(__BASE__ + "config/enums").post_type;
var ENUMS = require(__BASE__ + "config/enums");
var IMAGE_TYPES = require(__BASE__+"config/enums").image_resolution_types;
var ROLES = ENUMS.roles;


var PostSchema = new mongoose.Schema(
    {
        //_id: Object,

        posted_by: {type: String, ref: 'User', required: true},
        // TODO: change this to a single group everywhere
        group: {type: String, ref: 'Group'},

        //set these manually
        create_time: {type: Date, required: true},
        update_time: {type: Date, required: true},

        content: {
            title: {type: String}, // if not present copy first couple of words followed by ellipsis...
            text: {type: String},

            // files: [{
            //     _id: {type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true},
            //     name: {type: String, required: true},
            //     mime_type: {type: String, required: true},
            //     image_resolution: {type: String, enum: [IMAGE_TYPES.IMAGE_MEDIUM, IMAGE_TYPES.IMAGE_HIGH]},
            //     url: {type: String, required: true},
            //     size: {type: Number},
            // }],

            file:{type:String},
        },

        type:{type:String,
        enum:[POST_TYPES.TECHNOLOGY,POST_TYPES.CIVICS,POST_TYPES.POLITICS,POST_TYPES.EDUCATION],
        required:true},

        tags: [{type: mongoose.Schema.Types.ObjectId, ref: 'Tag'}],

        like:{type:Number,default:0},
        dislike:{type:Number,default:0},
        // number of comments
        comment:[{
            user: {type: String, ref: 'User'},
            firstname:{type:String},
            lastname:{type:String},
            text:{type:String},
            profilePic:{type:String},
            occupation:{type:String},
            upvote_count:{type:Number,default:0},
            downvote_count:{type:Number,default:0},
            created_at: {type: Date, default: new Date()},
            uploadedFile:{type:String}
        }
        ],
        comment_count: {type: Number, default: 0},
        // The group For which the attendance/Reminder was created - On Populate it will give the institute Details


    },
    {
        minimize: false
    }
);

PostSchema.index({group: 1, _id: -1});
PostSchema.index({recipients: 1, _id: -1});
PostSchema.index({group: 1, allow: 1, _id: -1});


module.exports = mongoose.model('Post', PostSchema);
