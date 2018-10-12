var crypto = require('crypto');
var uuid = require('node-uuid');
var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
var numeric = "0123456789";
var alphaNumeric = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ-_";

var MAX = characters.length;
var NUMERIC_MAX = numeric.length;
var APLHA_NUMERIC_MAX = alphaNumeric.length;
var USERID_LENGTH = 10;
var PROID_LENGTH = 10;
var NUMNERIC_OTP_LENGTH = 6;

var shortid = require('shortid');
shortid.characters(alphaNumeric);

// TODO: check for optimizations.
/*
 crypto.randomBytes has more randomness than Math.random(psedo random) but the later is a shivam's teenie bit faster
 */

var random = function (max, length) {
    var randomNumbers = crypto.randomBytes(length);
    for (var i = 0; i < length; i++) {
        randomNumbers[i] = (Math.floor(((randomNumbers[i] | 0 + 1) / 256) * max));
    }
    return randomNumbers;
}

var getRandomString = function (length) {
    var id = "";
    var randomNumbers = random(APLHA_NUMERIC_MAX, length);
    for (var i = 0; i < length; i++) {
        id += alphaNumeric.charAt(randomNumbers[i]);
    }
    return id;
};

var getNumericID = function (max, length) {
    var id = "";
    var randomNumbers = random(max, length);
    for (var i = 0; i < length; i++) {
        id += numeric.charAt(randomNumbers[i]);
    }
    return id;
};


var getOTP = function () {
    return getNumericID(NUMERIC_MAX, NUMNERIC_OTP_LENGTH);
}

var getUniqueUserID = function () {
    return uuid.v4();
}

var getRandomFileID = function () {
    return getRandomString(7) + "_" + getRandomString(13) + "_" + getRandomString(19);
}

var getRandomFolderID = function () {
    return getRandomString(50);
}

var getRandomAplhaNumeric = function () {
    return shortid.generate();
};

module.exports = {
    getOTP: getOTP,
    getUniqueUserID: getUniqueUserID,
    getRandomFileID: getRandomFileID,
    getRandomFolderID: getRandomFolderID,
    
    // TODO: replace this with shortId
    getRandomString: getRandomString,
    getRandomAplhaNumeric: getRandomAplhaNumeric
}
