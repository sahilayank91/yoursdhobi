let User = require(__BASE__ + 'modules/database/models/user');
let customUUID = require(__BASE__ + "modules/utils/CustomUUID");
let Promise = require('bluebird');
let Counter = require(__BASE__ + 'modules/database/models/counter');


//A template to input the data required at the registration of the user
let getCreateTemplate = function (parameters) {
    if ((!parameters.email && !parameters.phone)) {
        return {};
    }
    let template = {}
    for (let key in parameters) {
        switch (key) {
        	case '_id':
          case 'name':
					case 'firstname':
					case 'middlename':
					case 'lastname':
					case 'email':
					case 'phone':
					case 'password':
					case 'profilePic':
					case 'secondary_email':
					case 'secondary_phone':
					case 'keys':
					case 'gender':
					case 'dob':
					case 'fathername':
					case 'interest':
					case 'mothername':
					case 'father_mobileno':
					case 'mother_mobileno':
					case 'parent_email':
					case 'permanent_address':
					case 'local_address':
                    case 'expertise':
                    case 'occupation':
                template[key] = parameters[key];
                break;
        }
    }


    template.created_at = new Date();

    // if (parameters.password) {
    //     template.password = cryptographer.hashIt(parameters.password);
    // }

    if (!template._id) {
        template._id = customUUID.getRandomAplhaNumeric();
    }

    return template;
};



let createUser = function (parameters) {
	return new Promise(function(resolve, reject) {
		let template = getCreateTemplate(parameters);
			/*Store the user using the template*/
			let user = new User(template);
			user.save(function(err, data) {
				if (!err) {
					resolve(data);
				} else {
					console.log(err);
					reject(new Error('createUser failed'));
				}
			});
	});
};


let getUsers = function (rule, fields, options) {
    return new Promise(function (resolve, reject) {
        User.find(rule, fields, options).exec(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                reject(new Error('Failed to get Users'));
            }
        });
    });
};


let getUserFullDetail = function (rule, fields, options) {
	return new Promise(function (resolve, reject) {
		User.find(rule, fields, options).exec(function (err, data) {
			if (!err) {
				resolve(data);
			} else {
				reject(new Error('Failed to get Users'));
			}
		});
	});
};


let deleteUsers = function(rule,fields,options){
    return new Promise(function (resolve,reject){
            User.remove(rule,fields, options).exec(function(err,data){
                if(!err){
                    resolve(data);
                }else{
                    reject(new Error("Failed to delete Users"));
                }
            });
    });
};

let updateUser = function(rule,fields,options){
  return new Promise(function(resolve,reject){
    User.findOneAndUpdate(rule,fields, {upsert: true}).exec(function(err,data){
        if(!err){
            resolve(data);
        }else{
            reject(new Error("Failed to update Users"));
        }
    });
  });
};

let getUserById = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        User.find(rule,fields,options).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to get User"));
            }
        });
    });
};


let followUser = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        User.update(rule,fields,options).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to update Users"));
            }
        });
    });
};

let addFollower = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        User.update(rule,fields,options).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to update Users"));
            }
        });
    });
};
let removeFollower = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        User.update(rule,fields,options).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to update Users"));
            }
        });
    });
};


let unfollowUser = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        User.update(rule,fields,options).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to update Users"));
            }
        });
    });
};


let changePassword = function(rule,fields,options){
    return new Promise(function(resolve,reject){
        User.update(rule,fields,options).exec(function(err,data){
            if(!err){
                resolve(data);
            }else{
                reject(new Error("Failed to update Users"));
            }
        });
    });
};


module.exports = {
    createUser: createUser,
    getUsers: getUsers,
    updateUser:updateUser,
    getUserById:getUserById,
	getUserFullDetail:getUserFullDetail,
    followUser:followUser,
    addFollower:addFollower,
    removeFollower:removeFollower,
    unfollowUser:unfollowUser,
    changePassword:changePassword

};