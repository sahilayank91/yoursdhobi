var mongoose = require('mongoose');
var ENUMS = require(__BASE__ + "config/enums");
var ROLES = ENUMS.roles;
var BRANCH = ENUMS.branch;
var CATEGORY = ENUMS.category;
var GENDER = ENUMS.gender;
var YEAR = ENUMS.year;
var UserSchema = new mongoose.Schema({
    _id: String,
	firstname: {type: String, required: true}, //change the keys whenever firstname changes
	middlename:{type:String},
	lastname: {type: String}, //change the keys whenever lastname changes
	name:{type:String},
	phone: String,
	email: {type:String,unique:true},
	dob:{type:Date},
    role:{
        type:String,
        enum:[ROLES.CUSTOMER,ROLES.WASHER,ROLES.AGENT],
    },
    password: {type: String, required: false},
	gender: {
		type:String,

		enum:[GENDER.MALE,GENDER.FEMALE,GENDER.OTHER]
	},
    address:{type:String},
    profilePic: {type:String},
    activated: {type: Boolean, default: false},
    created_at: {type: Date, default: new Date()},
    created_by: {type: String, ref: 'User'},
    occupation:{type:String},
    latitude:{type:Number},
    longitude:{type:Number},
    about: String,
    }, {
    minimize: false
});


module.exports = mongoose.model('User', UserSchema);
