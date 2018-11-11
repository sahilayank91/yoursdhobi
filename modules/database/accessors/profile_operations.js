let User = require(__BASE__ + 'modules/database/models/user');
let Promise = require('bluebird');

let getProfile = function(rule,fields,options){
	return new Promise(function(resolve,reject){
		User.find({_id:rule},fields,options).exec(function(err,data){
			if(!err){
				resolve(data);
			}else{
				reject(new Error("Failed to get User Profile"));
			}
		});
	});
};

let updateProfile = function(rule,fields){
	return new Promise(function(resolve,reject){
		User.findOneAndUpdate(rule,fields, {upsert: true}).exec(function(err,data){
			if(!err){
				resolve(data);
			}else{
				reject(new Error("Failed to update User's Profile"));
			}
		});
	});
};

module.exports = {
	getProfile: getProfile,
	updateProfile: updateProfile
};