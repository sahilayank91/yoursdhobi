let orderOperations = require(__BASE__+"modules/database/accessors/order_operations");
let userOperations = require(__BASE__+"modules/database/accessors/user_operations");
const axios = require('axios');
var distance = require('google-distance');
distance.apiKey = 'AIzaSyCVxodOWzadw3PN1IOWexAfph64d-Y-pOg';

let distanceurl = "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=40.6655101,-73.89188969999998&destinations=40.6905615%2C-73.9976592&key=AIzaSyBnCpVKXJg6GWvC2NZQ5zDxnd9oeE1QIEc";
let apikey = 'AIzaSyCVxodOWzadw3PN1IOWexAfph64d-Y-pOg';
let distance_url= "https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=";
let newOrder = function(parameters){
    console.log(parameters);
    return orderOperations.createOrder(parameters)
        .then(function(data){
            if(data){
                userOperations.getUsers({role:"Washerman",city:parameters.city})
                    .then(function(result){
                        let param = {};
                        distance_url = distanceurl + parameters.latitude + ',' + parameters.longitude;
                        distance_url = '&destinations=';
                            if(result.length>0){
                                for(let i=0;i<result.length;i++){
                                    distance_url+=result[i].latitude + '%2C' + result[i].longitude;
                                }
                                axios.get(distanceurl + 'origins='+result[i].latitude+','+result[i].longitude+'&'+'destinations=' + parameters.latitude+'%2C'+parameters.longitude + '&key=' + apikey)
                                    .then(response => {
                                        console.log(response);
                                        // console.log(response.data.url);
                                        // console.log(response.data.explanation);
                                    })
                                    .catch(error => {
                                        console.log(error);
                                    });

                            }
                            console.log("total washername",result);
                        console.log(result);
                    }).catch(function(err){
                        console.log(err);
                });



                return data;
            }else{
                throw new Error('Cant create order with the given credentials');
            }
            return data;
        }).catch(function(error){
            console.log("Error in createOrder",error);
        })
};

let getOrder = function(parameters){
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
let getOrderByUserId = function(parameters){
    return orderOperations.getOrderByUserId(parameters)
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
let getTodayOrder = function(parameters){

    return orderOperations.getTodayOrder(parameters)
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('Cant get Orders with the given credentials');
            }
        }).catch(function(error){
            console.log("Error in createUser",error);
        })
};

let cancelOrder = function(parameters){
    return orderOperations.cancelOrder(parameters)
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('Cant cancel order with the given credentials');
            }
        }).catch(function(error){
            console.log("Error in cancelOrder",error);
        })
};

module.exports = {
   newOrder:newOrder,
    getOrder:getOrder,
    updateOrder:updateOrder,
    getOrderById:getOrderById,
    getOrderByUserId:getOrderByUserId,
    getTodayOrder:getTodayOrder,
    cancelOrder:cancelOrder

};