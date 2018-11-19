let express = require('express');
let router = express.Router();
let RESPONSE = require(__BASE__ + "modules/controller/handler/ResponseHandler");
let DataValidator = require(__BASE__ + "modules/utils/DataValidator");
let FeedbackController = require(__BASE__ + "modules/controller/FeedbackController");


router.post('/getFeedback', function(req, res) {


        let parameters = {
            userid: req.body.userid,
        };

        FeedbackController.getFeedback(parameters)
            .then(function (data) {
                console.log(data);
                if (data) {

                    data = data.reverse();
                    RESPONSE.sendOkay(res, data);
                } else {
                    console.log("Some error occured while getting data from the database");
                }
            }).catch(function (err) {
            console.log(err);
        });



});


router.post('/newFeedback', function(req, res) {


    let parameters = {
        userid:req.body.userid,
        comment:req.body.comment,
        reaction:req.body.reaction
    };

    FeedbackController.submitFeedback(parameters)
        .then(function (data) {
            if (data.length >0) {
                console.log(data[0]);
                RESPONSE.sendOkay(res, data[0]);
            } else {
                console.log("Some error occured while getting data from the database");
            }
        }).catch(function (err) {
        console.log(err);
    });



});

module.exports = router;
