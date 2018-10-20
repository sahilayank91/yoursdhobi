var mongoose = require('mongoose');
var ENUMS = require(__BASE__ + "config/enums");
var ROLES = ENUMS.roles;
var BRANCH = ENUMS.branch;
var CATEGORY = ENUMS.category;
var GENDER = ENUMS.gender;
var YEAR = ENUMS.year;
var STATUS = ENUMS.status;
var OrderSchema = new mongoose.Schema({
    _id: String,
    upper: {type: String},
    bottom: {type: String},
    woollen: {
        type: String
    },
    jacket: {type: String},
    blanket_single: {type: String},
    blanket_double: {type: String},
    bedsheet_single: {type: String},
    bedsheet_double: {type: String},
    pickup_date: {type: String},
    address: {type: String},
    created_at: {type: Date, default: new Date()},
    userid: {type: String, ref: 'User'},

    latitude: {type: Number},
    longitude: {type: Number},
    status:{type:String,enum:[STATUS.RECIEVED,ENUMS.COMPLETED,ENUMS.DELIVERED,ENUMS.CANCELLED],required:true},
    minimize: false,

});
OrderSchema.index({_id: 1, created_at: -1});


module.exports = mongoose.model('Order', OrderSchema);
