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
        type:req.body.type,
        day:req.body.day,
        month:req.body.month,
        year:req.body.year
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
                return true;
            } else {
                RESPONSE.sendOkay(res, {success: false,data:data});
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
        day:req.body.day,
        month:req.body.month,
        year:req.body.year,
         status: { $ne: "Delivered" }
    };
    OrderController.getOrderByDate(parameters)
        .then(function (data) {
            if (data) {
                console.log("today",data);
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
        pickup_date: { $gte: new Date().setHours(22,0,0,) },
        status:'Recieved'
    };
    OrderController.getOrderByDate(parameters)
        .then(function (data) {
            if (data) {
                console.log("upcoming",data);

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
        status:'Delivered'
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

router.post('/getPickedOrders',function(req,res) {
    let parameters = {
        washerman_id:req.body.washerman_id,
        status:'Picked'
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


router.post('/refuseOrder',function(req,res) {
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
           if(data){
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
            if(data){
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
        percentage:req.body.percentage,
        type:req.body.type
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

});
router.post('/createDonation',function (req,res) {

    let parameters = {
        type:req.body.type,
        url:req.body.url,
        service:req.body.service,

    };

    OrderController.createDonation(parameters)
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

    let parameters = {type:'Offer'};

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

router.post('/getImages',function (req,res) {

    let parameters = {};

    OrderController.getImages(parameters)
        .then(function(data){
            if (data) {
                console.log(data);
                RESPONSE.sendOkay(res, {success: true,data:data});
                return true;
            } else {
                console.log("Some error occured while getting Images from the database");
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