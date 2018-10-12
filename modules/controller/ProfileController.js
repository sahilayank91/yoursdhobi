var profileOperations = require(__BASE__+"modules/database/accessors/profile_operations");

var getProfile = function(id){
	return profileOperations.getProfile(id)
		.then(function(data){
			if(data){
				console.log("user data : ",data[0].firstname);
				return data;
			}else{
				throw new Error('No User exists with given id');
			}
		}).catch(function(error){
			console.log("Error in getting Profile ",error);
		});
};

var updateProfile = function(parameters){
	return profileOperations.updateProfile({_id:parameters._id},parameters)
		.then(function(data){
			if(data){
				return data;
			}else{
				throw new Error('Cant update user with the given credentials');
			}
		}).catch(function(error){
			console.log("Error in updateUser",error);
		});
};

module.exports = {
	getProfile:getProfile,
	updateProfile:updateProfile

};