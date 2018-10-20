let orderOperations = require(__BASE__+"modules/database/accessors/order_operations");

let newOrder = function(parameters){
    console.log(parameters);
    return orderOperations.createOrder(parameters)
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('Cant create order with the given credentials');
            }
        }).catch(function(error){
            console.log("Error in createOrder",error);
        })
};

let getOrder = function(parameters){
    console.log(parameters);
    return orderOperations.getOrder(parameters)
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('Cant create user with the given credentials');
            }
        }).catch(function(error){
            console.log("Error in createUser",error);
        })
};

let updateOrder = function(parameters){
    console.log(parameters);
    return orderOperations.updateOrder(parameters)
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('Cant update order with the given credentials');
            }
        }).catch(function(error){
            console.log("Error in updateOrder",error);
        })
};


let getOrderById = function(parameters){
    console.log(parameters);
    return orderOperations.getOrderById(parameters)
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('Cant create user with the given credentials');
            }
        }).catch(function(error){
            console.log("Error in createUser",error);
        })
};
module.exports = {
   newOrder:newOrder,
    getOrder:getOrder,
    updateOrder:updateOrder,
    getOrderById:getOrderById
};