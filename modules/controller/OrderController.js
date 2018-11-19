let orderOperations = require(__BASE__+"modules/database/accessors/order_operations");
let userOperations = require(__BASE__+"modules/database/accessors/user_operations");
const axios = require('axios');
let distance = require('google-distance-matrix');

distance.key('AIzaSyBq-PPSGvFPuqdq-7gNFGRQk9qS-xp5bAQ');
distance.mode('driving');

let newOrder = function(parameters){
    console.log(parameters);
    return orderOperations.createOrder(parameters)
        .then(function(data){
            console.log("order created",data);
            let washerman = {};
            if(data){
                userOperations.getUsers({role:"Washerman",city:parameters.city})
                    .then(function(result){
                        let origins = [];
                        origins.push(parameters.latitude+','+parameters.longitude);
                        let destinations =[];

                            if(result.length>0){
                                for(let i=0;i<result.length;i++){
                                    destinations.push(result[i].latitude + ',' + result[i].longitude);
                                }
                                distance.matrix(origins, destinations, function (err, distances) {
                                    if (err) {
                                        return console.log(err);
                                    }
                                    if(!distances) {
                                        return console.log('no distances');
                                    }
                                    if (distances.status === 'OK') {
                                        for (let i=0; i < origins.length; i++) {
                                            for (let j = 0; j < destinations.length; j++) {
                                                let origin = distances.origin_addresses[i];
                                                let destination = distances.destination_addresses[j];
                                                if (distances.rows[0].elements[j].status === 'OK') {
                                                    console.log(distances.rows[i].elements[j]);

                                                    let distance = distances.rows[i].elements[j].distance.text;
                                                    let value = distances.rows[i].elements[j].distance.value;
                                                    if(washerman.value===undefined){
                                                        washerman.id = result[j]._id;
                                                        washerman.value = value;
                                                        washerman.text = distance;
                                                    }else{
                                                        if(washerman.value > value){
                                                            washerman.id = result[j]._id;
                                                            washerman.value = value;
                                                            washerman.text = distance;
                                                        }
                                                    }


                                                    console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
                                                } else {
                                                    console.log(destination + ' is not reachable by land from ' + origin);
                                                }
                                            }
                                        }

                                        orderOperations.addWasherman({_id:data._id},{$set:{washerman_id:washerman.id}})
                                            .then(function(data){
                                                if(data){
                                                    // console.log(data);
                                                    return data;
                                                }

                                            }).catch(function(err){
                                            console.log(err);
                                        });
                                    }
                                });
                            }
                    }).then(function(res){






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

let refuseOrder = function (parameters) {
    return orderOperations.refuseOrder(parameters)
        .then(function(data){
            console.log("order created",data);
            let washerman = {};
            if(data){
                userOperations.getUsers({role:"Washerman",city:parameters.city})
                    .then(function(result){
                        let origins = [];
                        origins.push(parameters.latitude+','+parameters.longitude);
                        let destinations =[];

                        if(result.length>0){
                            for(let i=0;i<result.length;i++){
                                destinations.push(result[i].latitude + ',' + result[i].longitude);
                            }
                            distance.matrix(origins, destinations, function (err, distances) {
                                if (err) {
                                    return console.log(err);
                                }
                                if(!distances) {
                                    return console.log('no distances');
                                }
                                if (distances.status === 'OK') {
                                    for (let i=0; i < origins.length; i++) {
                                        for (let j = 0; j < destinations.length; j++) {
                                            let origin = distances.origin_addresses[i];
                                            let destination = distances.destination_addresses[j];
                                            if (distances.rows[0].elements[j].status === 'OK') {
                                                console.log(distances.rows[i].elements[j]);

                                                let distance = distances.rows[i].elements[j].distance.text;
                                                let value = distances.rows[i].elements[j].distance.value;
                                                if(washerman.value===undefined){
                                                    washerman.id = result[j]._id;
                                                    washerman.value = value;
                                                    washerman.text = distance;
                                                }else{
                                                    if(washerman.value > value){
                                                        washerman.id = result[j]._id;
                                                        washerman.value = value;
                                                        washerman.text = distance;
                                                    }
                                                }


                                                console.log('Distance from ' + origin + ' to ' + destination + ' is ' + distance);
                                            } else {
                                                console.log(destination + ' is not reachable by land from ' + origin);
                                            }
                                        }
                                    }

                                    orderOperations.addWasherman({_id:data._id},{$set:{washerman_id:washerman.id}})
                                        .then(function(data){
                                            if(data){
                                                // console.log(data);
                                                return data;
                                            }

                                        }).catch(function(err){
                                        console.log(err);
                                    });
                                }
                            });
                        }
                    }).then(function(res){
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
}
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


let verifyPickup = function(parameters){
    return orderOperations.getOrder(parameters)
        .then(function(data){
            if(data){
                return updateOrder(parameters,{status:"Picked"});
            }else{
                throw new Error('Cant create user with the given credentials');
            }
        }).catch(function(error){
            console.log("Error in createUser",error);
        })
};

let verifyDelivery = function(parameters){
    return orderOperations.getOrder(parameters)
        .then(function(data){
            if(data){
                return updateOrder(parameters,{status:"Delivered"});
            }else{
                throw new Error('Cant create user with the given credentials');
            }
        }).catch(function(error){
            console.log("Error in createUser",error);
        })
};


let updateOrder = function(parameters,template){
    return orderOperations.updateOrder(parameters,template)
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
let getOrderByDate = function(parameters){

    return orderOperations.getOrderByDate(parameters)
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

let checkIfUserHasUsedCoupon = function(parameters){
  return orderOperations.checkIfUserHasUsedCoupon(parameters)
      .then(function(data){
          if(data){
              return data;
          }else{
              throw new Error('Cant find order with the given credentials');
          }
      })
};

let createOffer = function(parameters){
    return orderOperations.createOffer(parameters)
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

let getOffer = function(parameters){
    return orderOperations.getOffer(parameters)
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('Cant get offer with the given credentials');
            }
        }).catch(function(error){
            console.log("Error in createUser",error);
        })
};
let createUserOfferRelation = function(parameters){
    return orderOperations.createUserOfferRelation(parameters)
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
    getOrderById:getOrderById,
    getOrderByUserId:getOrderByUserId,
    getOrderByDate:getOrderByDate,
    cancelOrder:cancelOrder,
    verifyPickup:verifyPickup,
    verifyDelivery:verifyDelivery,
    checkIfUserHasUsedCoupon:checkIfUserHasUsedCoupon,
    createOffer:createOffer,
    getOffer:getOffer,
    createUserOfferRelation:createUserOfferRelation

};