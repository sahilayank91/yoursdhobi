let Order = require(__BASE__ + 'modules/database/models/order');
let Offer_User = require(__BASE__ + 'modules/database/models/relations/offer_user');
let Image = require(__BASE__ + 'modules/database/models/images');
let customUUID = require(__BASE__ + "modules/utils/CustomUUID");
let Promise = require('bluebird');

//A template to input the data required at the registration of the user
let getCreateTemplate = function (parameters) {

    let template = {}
    for (let key in parameters) {
        switch (key) {
            case '_id':
            case 'phone':
            case 'upper':
            case 'bottom':
            case 'woollen':
            case 'jacket':
            case 'blanket_single':
            case 'blanket_double':
            case 'bedsheet_single':
            case 'bedsheet_double':
            case 'permanent_address':
            case 'status':
            case 'address':
            case 'pickup_date':
            case 'local_address':
            case 'service':
            case 'order':
            case 'latitude':
            case 'longitude':
            case 'washerman_id':
            case 'userid':
            case 'total':
            case 'pickup_otp':
            case 'delivered_otp':
            case 'type':
            case 'email':
            case 'offer':
            case 'code':
            case 'offerid':
            case 'day':
            case 'month':
            case 'year':
                template[key] = parameters[key];
                break;
        }
    }


    template.created_at = new Date();

    template.pickup_otp  = customUUID.getOTP();

    template.delivered_otp = customUUID.getOTP();

    if(template.pickup_date){
        template.pickup_date = new Date(Number(template.pickup_date)).setHours(17,0,0,0);
    }

    if (!template._id) {
        template._id = customUUID.getRandomString(6);
    }

    return template;
};

let getImageCreateTemplate = function (parameters) {

    let template = {}
    for (let key in parameters) {
        switch (key) {
            case '_id':
            case 'percentage':
            case 'offer':
            case 'url':
            case 'code':
            case 'service':
            case 'type':
                template[key] = parameters[key];
                break;
        }
    }


    template.created_at = new Date();

    if (!template._id) {
        template._id = customUUID.getRandomString(6);
    }

    return template;
};

let getOfferUserRelationCreateTemplate = function (parameters) {

    let template = {}
    for (let key in parameters) {
        switch (key) {
            case '_id':
            case 'offerid':
            case 'user':
                template[key] = parameters[key];
                break;
        }
    }


    template.created_at = new Date();

    if (!template._id) {
        template._id = customUUID.getRandomString(6);
    }

    return template;
};
let createOrder = function (parameters) {
    return new Promise(function(resolve, reject) {
        let template = getCreateTemplate(parameters);
        /*Store the user using the template*/
        let order = new Order(template);
        order.save(function(err, data) {
            if (!err) {
                resolve(data);
            } else {
                console.log(err);
                reject(new Error('createOffer failed'));
            }
        });
    });
};


let createOffer = function(parameters){
    return new Promise(function(resolve, reject) {
        let template = getImageCreateTemplate(parameters);
        /*Store the user using the template*/
        let offer = new Image(template);
        offer.save(function(err, data) {
            if (!err) {
                resolve(data);
            } else {
                console.log(err);
                reject(new Error('createOffer failed'));
            }
        });
    });
};

let createDonation = function(parameters){
    return new Promise(function(resolve, reject) {
        let template = getImageCreateTemplate(parameters);
        /*Store the user using the template*/
        let offer = new Image(template);
        offer.save(function(err, data) {
            if (!err) {
                resolve(data);
            } else {
                console.log(err);
                reject(new Error('createDonation failed'));
            }
        });
    });
};

let createUserOfferRelation = function(parameters){
    return new Promise(function(resolve, reject) {
        let template = getOfferUserRelationCreateTemplate(parameters);
        /*Store the user using the template*/
        let offer = new Offer_User(template);
        offer.save(function(err, data) {
            if (!err) {
                resolve(data);
            } else {
                console.log(err);
                reject(new Error('createOrder failed'));
            }
        });
    });
};
let getOrder = function (rule, fields, options) {
    return new Promise(function (resolve, reject) {
        Order.find(rule, fields, options).exec(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                reject(new Error('Failed to get Users'));
            }
        });
    });
};


let getOrderFullDetail = function (rule, fields, options) {
    return new Promise(function (resolve, reject) {
        Order.find(rule, fields, options).exec(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                reject(new Error('Failed to get Users'));
            }
        });
    });
};


let deleteOrder = function(rule,fields,options){
    return new Promise(function (resolve,reject){
        Order.remove(rule,fields, options).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to delete Users"));
            }
        });
    });
};

let updateOrder = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        Order.findOneAndUpdate(rule,fields, {upsert: true}).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to update Users"));
            }
        });
    });
};

let getOrderById = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        Order.find(rule,fields,options).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to get Order by Id"));
            }
        });
    });
};



let getOrderByUserId = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        Order.find(rule,fields,options)
            .populate([
            {
                path: "userid",
                select: '_id firstname lastname address flataddress city phone pincode latitude longitude'
            }
        ]).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to get User"));
            }
        });
    });
};
let cancelOrder = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        Order.remove(rule,fields,options).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to cancel Order"));
            }
        });
    });
};
let addWasherman = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        Order.findOneAndUpdate(rule,fields, {upsert: true}).exec(function(err,data){
            if(!err){
                console.log(data);
                resolve(data);
            }else{
                reject(new Error("Failed to cancel Order"));
            }
        });
    });
};
let getOrderByDate = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        Order.find(rule,fields,options)
            .populate([
                {
                    path: "userid",
                    select: '_id firstname lastname address flataddress city phone pincode latitude longitude'
                }
            ])
            .exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to get order"));
            }
        });
    });
};



let checkIfUserHasUsedCoupon = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        Offer_User.find(rule,fields,options).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to get relation"));
            }
        });
    });
};

let getOffer = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        Image.find(rule,fields,options).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to get Offer"));
            }
        });
    });
};

let getImages= function(rule,fields,options){
    return new Promise(function(resolve,reject){
        Image.find(rule,fields,options).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to get Offer"));
            }
        });
    });
};


module.exports = {
    createOrder: createOrder,
    getOrder: getOrder,
    updateOrder:updateOrder,
    getOrderById:getOrderById,
    getOrderFullDetail:getOrderFullDetail,
    getOrderByUserId:getOrderByUserId,
    cancelOrder:cancelOrder,
    getOrderByDate:getOrderByDate,
    addWasherman:addWasherman,
    checkIfUserHasUsedCoupon:checkIfUserHasUsedCoupon,
    createOffer:createOffer,
    getOffer:getOffer,
    createDonation:createDonation,
    getImages:getImages,
    createUserOfferRelation:createUserOfferRelation
};