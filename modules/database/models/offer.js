let mongoose = require('mongoose');
let ENUMS = require(__BASE__ + "config/enums");


let OfferSchema = new mongoose.Schema(
    {
        _id:{type:String},
        percentage:{type:String},
        url:{type:String},
        code:{type:String},
        expiry:{type:Date},
        service:{type:String},
        created_at:{type:Date,default:new Date()}

    },
    {
        minimize: false
    }
);

OfferSchema.index({_id: -1});
module.exports = mongoose.model('Offer', OfferSchema);
