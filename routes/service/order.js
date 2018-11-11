let express = require('express');
let router = express.Router();
let RESPONSE = require(__BASE__ + "modules/controller/handler/ResponseHandler");
let OrderController = require(__BASE__ + "modules/controller/OrderController");


router.post('/newOrder',function(req,res) {
    let parameters = {
        userid:req.body.userid,
        order:req.body.order,
        service:req.body.service,
        pickup_date:req.body.pickup_date,
        latitude:req.body.latitude,
        longitude:req.body.longitude,
        status:req.body.status,
        address:req.body.address,
        city:req.body.city,
        total:req.body.total
    };

    console.log("parameters",parameters);

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
    let parameters = {
        _id:req.body._id,
    };

    OrderController.getOrder(parameters)
        .then(function (data) {
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }
        });
});

router.post('/getOrderByUserId',function(req,res) {
    let parameters = {
        userid:req.body.userid,
    };
    OrderController.getOrderByUserId(parameters)
        .then(function (data) {
            if (data) {
                data = data.reverse();
                RESPONSE.sendOkay(res, {success: true,data:data});
                // RESPONSE.sendOkay(res, parameters);
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }


        });
});

router.post('/getTodayOrders',function(req,res) {
    let parameters = {
        washerman_id:req.body.washerman_id,
        pickup_date:new Date().setHours(17,0,0,0)
    };
    console.log(parameters);
    OrderController.getOrderByDate(parameters)
        .then(function (data) {
            if (data) {
                console.log(data);
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }


        });
});

router.post('/getUpcomingOrders',function(req,res) {
    let parameters = {
        washerman_id:req.body.washerman_id,
        pickup_date: { $gte: new Date().setHours(22,0,0,) }
    };
    OrderController.getOrderByDate(parameters)
        .then(function (data) {
            if (data) {
                console.log(data);
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }


        });
});

router.post('/getCompletedOrders',function(req,res) {
    let parameters = {
        washerman_id:req.body.washerman_id,
        status:'Completed'
    };
    OrderController.getOrderByUserId(parameters)
        .then(function (data) {
            if (data) {
                console.log(data);
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }
        });
});

router.post('/updateOrder',function(req,res) {
    let parameters = {
        _id:req.body._id,
    };

    OrderController.updateOrder(parameters)
        .then(function (data) {
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }


        });
});
router.post('/cancelOrder',function(req,res) {
    let parameters = {
        _id:req.body._id,
    };

    OrderController.cancelOrder(parameters)
        .then(function (data) {
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }


        });
});
module.exports = router;