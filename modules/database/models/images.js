let mongoose = require('mongoose');
let ENUMS = require(__BASE__ + "config/enums");
let IMAGE_TYPE = ENUMS.image_type;

let ImageSchema = new mongoose.Schema(
    {
        _id:{type:String},
        percentage:{type:String},
        url:{type:String},
        code:{type:String},
        expiry:{type:Date},
        
        type:{type:String,
        enum:[IMAGE_TYPE.DONATION,IMAGE_TYPE.OFFER],
        required:true},

        service:{type:String},
        created_at:{type:Date,default:new Date()}

    },
    {
        minimize: false
    }
);

ImageSchema.index({_id: -1});
module.exports = mongoose.model('Image', ImageSchema);
