/*
 Add all types of input validations here
 */
const TITLE_LIST = require(__BASE__ + "config/enums").titles;
const GENDER_LIST = require(__BASE__ + "config/enums").genders;
const ASSIGNABLE_ACCESS_LEVELS = require(__BASE__ + "config/enums").assignable_access_levels;

const MIN_USERNAME_LENGTH = 3;
const MAX_USERNAME_LENGTH = 30;
const MIN_PASSWORD_LENGTH = 6;
const MAX_PASSWORD_LENGTH = 30;
const MIN_FIRSTNAME_LENGTH = 2;
const MAX_FIRSTNAME_LENGTH = 50;
const MIN_LASTNAME_LENGTH = 1;
const MAX_LASTNAME_LENGTH = 50;


var isValidEmail = function (email) {
    if (email && email.length > 0) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    } else {
        return false;
    }
    
};

var isValidPhone = function (num) {
    if (num) {
        return /^[789]\d{9}$/.test(num);
    } else {
        return false
    }
};

var isValidUsername = function (username) {
    if (username && username.length >= MIN_USERNAME_LENGTH && username.length <= MAX_USERNAME_LENGTH) {
        return /^[0-9a-zA-Z_.-]+$/.test(username);
    } else {
        return false;
    }
};

var isValidPassword = function (password) {
    if (password && password.length >= MIN_PASSWORD_LENGTH && password.length <= MAX_PASSWORD_LENGTH) {
        return true;
    } else {
        return false;
    }
};

// ! Accesses CONFIG.ROLES HERE BUT CONFIG (global config file), did not have any roles object
var isValidRole = function (role) {
    if (role && role.length > 0) {
        return CONFIG.ROLES.indexOf(role) >= 0;
    } else {
        return false;
    }
}


var isValidGroupType = function (type) {
    if (type) {
        return CONFIG.GROUPS.indexOf(type) >= 0;
    } else {
        return false;
    }
};

var isValidTitle = function (title) {
    if (title && title.length > 0) {
        return TITLE_LIST.indexOf(title) >= 0;
    } else {
        return false;
    }
}

var isValidGender = function (gender) {
    if (gender && gender.length > 0) {
        return GENDER_LIST.indexOf(gender) >= 0;
    } else {
        return false;
    }
}

 // TODO: use some regex for name too..
var isValidName = function(firstname, lastname , role){

    if(role=='org') {
        if (
            firstname && firstname.length >= MIN_FIRSTNAME_LENGTH && firstname.length <= MAX_FIRSTNAME_LENGTH
            && isValidTextWithNumbers(firstname)) {
            return true;
        } else return false;

    }


    if (
            firstname && firstname.length >= MIN_FIRSTNAME_LENGTH && firstname.length <= MAX_FIRSTNAME_LENGTH
            && isValidTextWithNumbers(firstname) && isValidTextWithNumbers(lastname)

        ) {

            if (!lastname || (lastname && lastname.length >= MIN_LASTNAME_LENGTH && lastname.length <= MAX_LASTNAME_LENGTH)) {
                    return true;
            } else {

                return false;
            }
        } else {
            return false;
        }
}



var isValidTextWithoutNumbers = function (text) {
    if (text) {
        text = text.trim();
        if (text.length > 0) {
            return /^[a-z ,.'-]+$/i.test(text);
        } else {
            return false;
        }
    } else {
        return false;
    }
    
};

var isValidTextWithNumbers = function (text) {
    if (text) {
        text = text.trim();
        if (text.length > 0) {
            return /^[a-z 0-9,.'-]+$/i.test(text);
        } else {
            return false;
        }
    } else {
        return false;
    }
};


var isAssignableAccessLevel = function (access) {
    return ASSIGNABLE_ACCESS_LEVELS.indexOf(access) >= 0;
};

var isValidObjectIdString = function (str) {
    return str && str.length == 24;
}


module.exports = {
    isValidEmail: isValidEmail,
    isValidPhone: isValidPhone,
    isValidUsername: isValidUsername,
    isValidPassword: isValidPassword,
    isValidRole: isValidRole,
    isValidTitle: isValidTitle,
    isValidGender: isValidGender,
    isValidName: isValidName,
    isValidTextWithoutNumbers: isValidTextWithoutNumbers,
    isValidTextWithNumbers: isValidTextWithNumbers,
    isAssignableAccessLevel: isAssignableAccessLevel,
    isValidObjectIdString: isValidObjectIdString,
    isValidRollNumber: isValidTextWithNumbers,
    isValidGroupType: isValidGroupType
}
