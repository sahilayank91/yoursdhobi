
var express = require('express');
var router = express.Router();
var userOperations = require(__BASE__+"modules/database/accessors/user_operations");
var profileOperations = require(__BASE__+"modules/database/accessors/profile_operations");
var path = require('path');
var cookieParser = require('cookie-parser');
var RESPONSE = require(__BASE__ + "modules/controller/handler/ResponseHandler");
var DataValidator = require(__BASE__ + "modules/utils/DataValidator");
var client = require(__BASE__ + "modules/controller/handler/TokenHandler").REDIS_CLIENT;
var OrderController = require(__BASE__ + "modules/controller/OrderController");
var ProfileController = require(__BASE__ + "modules/controller/ProfileController");
var TokenHandler = require(__BASE__ + "modules/controller/handler/TokenHandler");
const nodemailer = require('nodemailer');
let customUUID = require(__BASE__ + "modules/utils/CustomUUID");
let notificationOperations = require(__BASE__+"modules/database/accessors/notification_operations");


router.post('/newOrder',function(req,res) {
    var parameters = {
        userid:req.body.userid,
        upper:req.body.upper,
        bottom:req.body.bottom,
        woollen:req.body.woollen,
        jacket:req.body.jacket,
        blanket_single:req.body.blanket_single,
        blanket_double:req.body.blanket_double,
        bedsheet_single:req.body.bedsheet_single,
        bedsheet_double:req.body.bedsheet_double,
        pickupdate:req.body.pickupdate,
        latitude:req.body.latitude,
        longitude:req.body.longitude
    };

    OrderController.newOrder(parameters)
        .then(function (data) {
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data});
                // RESPONSE.sendOkay(res, parameters);
                return true;
            } else {
                console.log("Some error occured while adding order to the database");
                return false;
            }


        });
});

router.post('/getOrder',function(req,res) {
    var parameters = {
        _id:req.body._id,
    };

    OrderController.getOrder(parameters)
        .then(function (data) {
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data});
                // RESPONSE.sendOkay(res, parameters);
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }


        });
});
router.post('/updateOrder',function(req,res) {
    var parameters = {
        _id:req.body._id,
    };


    OrderController.updateOrder(parameters)
        .then(function (data) {
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data});
                // RESPONSE.sendOkay(res, parameters);
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }


        });
});
