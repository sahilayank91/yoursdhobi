var mongoose = require('mongoose');
var ENUMS = require(__BASE__ + "config/enums");


var OfferUserSchema = new mongoose.Schema(
    {
        _id:{type:String},
        user: {type:String,ref:'User'},
        offerid:{type:String, ref:'Image'},
        coupon:{type:String},
        created_at:{type:Date,default:new Date()}
    },
    {
        minimize: false
    }
);

OfferUserSchema.index({ _id: -1});
module.exports = mongoose.model('OfferUser', OfferUserSchema);
