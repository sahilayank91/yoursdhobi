var mongoose = require('mongoose');
var EVENT_TYPE = require(__BASE__ + "config/enums").event_type;
var EventSchema = new mongoose.Schema(
    {
        _id: {type:String},

        title:{type:String, required:true},
        description:{type:String, required:true},
        type: {
            type: String,
            enum:[EVENT_TYPE.SPORTS,EVENT_TYPE.SCHOLARSHIP,EVENT_TYPE.RESEARCH,EVENT_TYPE.RECRUITMENT,EVENT_TYPE.CULTURAL,EVENT_TYPE.ADMISSION,EVENT_TYPE.ACADEMICS],
            required: true
        },
        
        create_time: {type: Date, required: true},
        update_time: {type: Date},
        organizer:{type:String},
        date:{type:Date,required:true},
        eventPhoto:{type:String,required:true}
        
        // content: {
        //     title: {type: String}, // if not present copy first couple of words followed by ellipsis...
        //     text: {type: String},
        //
        //     files: [{
        //         _id: {type: mongoose.Schema.Types.ObjectId, ref: 'File', required: true},
        //         name: {type: String, required: true},
        //         mime_type: {type: String, required: true},
        //         image_resolution: {type: String, enum: [IMAGE_TYPES.IMAGE_MEDIUM, IMAGE_TYPES.IMAGE_HIGH]},
        //         url: {type: String, required: true},
        //         size: {type: Number}
        //     }]
        // }
    },
    {
        minimize: false
    }
);

module.exports = mongoose.model('Event', EventSchema);
