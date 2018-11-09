let Order = require(__BASE__ + 'modules/database/models/order');
let customUUID = require(__BASE__ + "modules/utils/CustomUUID");
let Promise = require('bluebird');
let moment = require('moment');

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
                template[key] = parameters[key];
                break;
        }
    }


    template.created_at = new Date();

    if(template.pickup_date){
        template.pickup_date = new Date(Number(template.pickup_date));
    }

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
                reject(new Error("Failed to get User"));
            }
        });
    });
};



let getOrderByUserId = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        Order.find(rule,fields,options).exec(function(err,data){
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

module.exports = {
    createOrder: createOrder,
    getOrder: getOrder,
    updateOrder:updateOrder,
    getOrderById:getOrderById,
    getOrderFullDetail:getOrderFullDetail,
    getOrderByUserId:getOrderByUserId,
    cancelOrder:cancelOrder
};