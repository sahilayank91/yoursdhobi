var mongoose = require('mongoose');
var ENUMS = require(__BASE__ + "config/enums");
var ROLES = ENUMS.roles;
var BRANCH = ENUMS.branch;
var CATEGORY = ENUMS.category;
var GENDER = ENUMS.gender;
var YEAR = ENUMS.year;
var STATUS = ENUMS.status;
var SERVICE = ENUMS.service_type;
var TYPE = ENUMS.type;

var OrderSchema = new mongoose.Schema({
    _id: String,
    email:{type:String},
    upper: {type: String},
    bottom: {type: String},
    woollen: {
        type: String
    },
    offer:{type:String},
    code:{type:String},
    jacket: {type: String},
    blanket_single: {type: String},
    blanket_double: {type: String},
    bedsheet_single: {type: String},
    bedsheet_double: {type: String},
    pickup_date: {type: Date,required:true},
    address: {type: String},
    created_at: {type: Date, default: new Date()},
    userid: {type: String, ref: 'User'},
    washerman_id:{type:String,ref:'User'},
    latitude: {type: Number},
    longitude: {type: Number},
    order:{type:String},
    city:{type:String},
    total:{type:String},
    day:{type:String},
    month:{type:String},
    year:{type:String},
    pickup_otp:{type:String},
    type:{type:String,enum:[TYPE.NORMAL,TYPE.EXPRESS]},
    delivered_otp:{type:String},
    service:{type:String,enum:[SERVICE.DRYCLEAN,SERVICE.PREMIUM_LAUNDRY,SERVICE.IRONING,SERVICE.WASH_AND_FOLD,SERVICE.WASH_AND_IRON,SERVICE.DONATION]},
    status:{type:String,enum:[STATUS.RECIEVED,STATUS.COMPLETED,STATUS.DELIVERED,STATUS.CANCELLED,STATUS.PICKED],required:true},
    minimize: false,

});
OrderSchema.index({_id: 1, created_at: -1});

module.exports = mongoose.model('Order', OrderSchema);
