let express = require('express');
let router = express.Router();
let RESPONSE = require(__BASE__ + "modules/controller/handler/ResponseHandler");
let OrderController = require(__BASE__ + "modules/controller/OrderController");


router.post('/newOrder',function(req,res) {
    let parameters = {
        userid:req.body.userid,
        email:req.body.email,
        offer:req.body.offer,
        order:req.body.order,
        service:req.body.service,
        pickup_date:req.body.pickup_date,
        latitude:req.body.latitude,
        longitude:req.body.longitude,
        status:req.body.status,
        address:req.body.address,
        city:req.body.city,
        total:req.body.total,
        type:req.body.type
    };

    if(req.body.offerid){
      offerid = req.body.offerid
    }
    if(req.body.code){
        parameters.code =req.body.code
    }
    if(req.body.offer){
        parameters.offer = req.body.offer
    }


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
                console.log(data);
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
                console.log(data);
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
                data = data.reverse();
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
                data = data.reverse();
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



router.post('/verifyPickup',function (req,res) {
   let parameters = {
       _id:req.body._id
   };

   if(req.body.pickup_otp){
       parameters.pickup_otp = req.body.pickup_otp;
   }

   // if(req.body.delivered_otp){
   //     parameters.delivered_otp = req.body.delivered_otp;
   // }


   OrderController.verifyPickup(parameters)
       .then(function(data){
           console.log(data);
           if(data.length>0){
               RESPONSE.sendOkay(res,{success:true});
           }else{
               RESPONSE.sendOkay(res,{success:false});
           }
       })

});



router.post('/verifyDelivery',function (req,res) {
    let parameters = {
        _id:req.body._id
    };

    // if(req.body.pickup_otp){
    //     parameters.pickup_otp = req.body.pickup_otp;
    // }

    if(req.body.delivered_otp){
        parameters.delivered_otp = req.body.delivered_otp;
    }


    OrderController.verifyDelivery(parameters)
        .then(function(data){
            console.log(data);
            if(data.length>0){
                RESPONSE.sendOkay(res,{success:true});
            }else{
                RESPONSE.sendOkay(res,{success:false});
            }
        })

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


router.post('/createOffer',function (req,res) {

    let parameters = {
        url:req.body.url,
        service:req.body.service,
        code:req.body.code,
        percentage:req.body.percentage
    };

    OrderController.createOffer(parameters)
        .then(function(data){
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }
        })

})
router.post('/createUserOfferRelation',function (req,res) {

    let parameters = {
        offerid:req.body.offerid,
        user:req.body.user,
    };

    OrderController.createUserOfferRelation(parameters)
        .then(function(data){
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }
        })

})



router.post('/getOffer',function (req,res) {

    let parameters = {};

    OrderController.getOffer(parameters)
        .then(function(data){
            if (data) {
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting order from the database");
                return false;
            }
        })

});

router.post('/checkIfUserHasUsedCoupon',function (req,res) {
   let parameters = {
        user:req.body.user,
        offerid:req.body.offerid
   };

   OrderController.checkIfUserHasUsedCoupon(parameters)
       .then(function(data){
            if(data.length>0){
                console.log(data);
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            }else{
                RESPONSE.sendOkay(res, {success: false,data:data});
                return true;
            }
       })



});
module.exports = router;