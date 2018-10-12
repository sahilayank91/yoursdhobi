var User = require(__BASE__ + 'modules/database/models/user');
var Faculty = require(__BASE__ + 'modules/database/models/faculty');
var customUUID = require(__BASE__ + "modules/utils/CustomUUID");
var Promise = require('bluebird');
var Counter = require(__BASE__ + 'modules/database/models/counter');


//A template to input the data required at the registration of the user
var getCreateTemplate = function (parameters) {
	if ((!parameters.email && !parameters.phone)) {
		return {};
	}
	var template = {}
	for (var key in parameters) {
		switch (key) {
			case '_id':
			case 'name':
			case 'firstname':
			case 'middlename':
			case 'lastname':
			case 'branch':
			case 'category':
			case 'email':
			case 'phone':
			case 'password':
			case 'role':
			case 'profilePic':
			case 'secondary_email':
			case 'secondary_phone':
			case 'keys':
			case 'gender':
			case 'dob':
			case 'fathername':
			case 'mothername':
			case 'father_mobileno':
			case 'mother_mobileno':
			case 'parent_email':
			case 'permanent_address':
			case 'hosteller':
			case 'local_address':
			case 'guardian_name':
			case 'guardian_phone':
			case 'guardian_address':
			case 'guardian_email':
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




var getNextSequenceValue = function(sequencename,fields,options){
	return new Promise(function(resolve,reject){
		Counter.findAndModify({_id:sequencename},{$inc:{sequence_value:1}},{upsert: true}).exec(function(err,data){
			if(!err){
				resolve(data);
			}else{
				reject(new Error("Failed to update Users"));
			}
		});
	});
};

var createUser = function (parameters) {
	return new Promise(function (resolve, reject) {
		var template = getCreateTemplate(parameters);
		var user = new User(template);
		console.log("THe user template generated 'is: ",user);
		user.save(function (err, data) {
			if (!err) {
				resolve(data);
			} else {
				console.log(err);
				reject(new Error('createUser failed'));
			}
		});

	});

};


var createFaculty = function (parameters) {
	return new Promise(function (resolve, reject) {
		var template = getCreateTemplate(parameters);
		console.log(template);
		var faculty = new Faculty(template);
		faculty.save(function (err, data) {
			if (!err) {
				resolve(data);
			} else {
				console.log(err);
				reject(new Error('createFaculty failed'));
			}
		});

	});

};


var getUsers = function (rule, fields, options) {
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


var getUserFullDetail = function (sequencename, fields, options) {
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


var deleteUsers = function(rule,fields,options){
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

var updateUser = function(rule,fields,options){
	return new Promise(function(resolve,reject){
		User.findOneAndUpdate(rule,fields,options).exec(function(err,data){
			if(!err){
				resolve(data);
			}else{
				reject(new Error("Failed to update Users"));
			}
		});
	});
};

var getUserById = function(rule,fields,options){
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

module.exports = {
	createUser: createUser,
	getUsers: getUsers,
	updateUser:updateUser,
	getUserById:getUserById,
	createFaculty:createFaculty
};