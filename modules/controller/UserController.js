let userOperations = require(__BASE__+"modules/database/accessors/user_operations");

let getUsers = function(parameters){
    return userOperations.getUsers({email: parameters.useremail, password: parameters.userpass})
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('No User exists with given useremail');
            }
        }).catch(function(error){
           console.log("Error in get Users: ",error);
        });

};
let getLoggedInUser = function(parameters){
    return userOperations.getUsers({email: parameters.useremail})
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('No User exists with given useremail');
            }
        }).catch(function(error){
            console.log("Error in get Users: ",error);
        });

};

let registerUser = function(parameters){
    console.log(parameters);
    return userOperations.createUser(parameters)
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

let updateProfilePic = function(parameters){
    console.log(parameters);

    return userOperations.updateProfilePic(parameters)
        .then(function(data){
            if(data){
                return data;
            }
        }).catch(function(err){
            console.log(err);

        })
}

let getUserFullDetail = function(parameters){
  console.log(parameters);
	return userOperations.getUsers(parameters)
		.then(function(data){
			if(data){
				return data;
			}else{
				throw new Error('No User exists with given useremail');
			}
		}).catch(function(error){
			console.log("Error in get Users: ",error);
		});
};


let followUser = function (userId, query,id) {
    return userOperations.followUser({_id: userId},query)
        .then(function (data) {
            let q = {
              $push:{"follower":userId}
            };
            userOperations.addFollower({_id:id},q)
                .then(function(data){
                    console.log("dafsadfa",data);

                })

        }).catch(function(err){
            console.log(err);
        })
};
let unfollowUser = function (userId, query,id) {
    return userOperations.unfollowUser({_id: userId},query)
        .then(function (data) {
            let q = {
                $pull:{"follower":userId}
            };
            userOperations.removeFollower({_id:id},q)
                .then(function(data){
                    return data;
                })
        }).catch(function(err){
            console.log(err);
        })
};


let forgotPassword = function (email) {
    return userOperations.getUsers({email:email})
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('No User exists with given useremail');
            }
        }).catch(function(error){
            console.log("Error in get Users: ",error);
        });

};



let changePassword = function (query,template) {
    return userOperations.changePassword(query,template)
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('No User exists with given useremail');
            }
        }).catch(function(error){
            console.log("Error in get Users: ",error);
        });

};

module.exports = {
  getUsers:getUsers,
  getUserFullDetail:getUserFullDetail,
  getLoggedInUser:getLoggedInUser,
  registerUser:registerUser,
  updateProfilePic:updateProfilePic,
    followUser:followUser,
    unfollowUser:unfollowUser,
    forgotPassword:forgotPassword,
    changePassword:changePassword
};