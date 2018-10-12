

var mongoose = require('mongoose');
var ENUMS = require(__BASE__ + "config/enums");
var ROLES = ENUMS.roles;
var Invoice = new mongoose.Schema({
    _id: Object,
    user: {type: String, ref: 'User', required: true},
    create_time: {type: Date, required: true},
    update_time: {type: Date, required: true},
    smsRecharge: {type: Number},
    serviceCharge: {type: Number},
    duePayment: {type: Number},
    subTotal: {type: Number},
    previousDue: {type: Number},
    totalAmountPayable: {type: Number},
    amountPaid: {type: Number},
    //currentDue: {type: Number},

    modeOfPayment: {type: String},
    remarks : String // for internal ops
  },

    {minimize: false });
 Invoice.index({user: 1});
 module.exports = mongoose.model('Invoice', Invoice);

