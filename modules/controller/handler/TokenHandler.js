const jwt = require("jsonwebtoken");
const Promise = require("bluebird");
const redis = Promise.promisifyAll(require("redis"));
const client = redis.createClient(process.env.REDIS_PORT, process.env.REDIS_HOST);
const LOGGER = require(__BASE__ + "modules/utils/Logger");
const SECRET_KEY = process.env.SECRET;
client.on('connect', function () {
    LOGGER.log.debug('[TOKEN AUTH] ' + 'Redis connection for Session Management is successful');
});


var generateAuthToken = function (userId, role) {
    var payload = {userId: userId, role: role};
    //var token =  jwt.sign(payload, SECRET_KEY, {expiresIn: TOKEN_EXPIRY_IN_SECONDS});
    var token = jwt.sign(payload, SECRET_KEY);
    return Promise.resolve(token);
};



var getDataFromRedis = function (token) {
    return client.getAsync(token)
        .then(function (data) {
            return JSON.parse(data);
        });
};

// EXPORTS

var validateToken = function (token) {
    return new Promise(function (resolve, reject) {
        if (token) {
            jwt.verify(token, SECRET_KEY, function (err, decoded) {
                var result;
                if (!err) {
                    result = true;
                } else {
                    LOGGER.logErrorMessage('validateToken', err, token);
                    result = false;
                }
                resolve(result);
            });
        } else {
            resolve(false);
        }
    });
}

var generateTokenAndSetUserData = function (userID, role, userData) {

    // data for redis
    var data = {};
    data._id = userID;
    data.authenticated = true;

    var token;
    return generateAuthToken(userID, role)
        .then(function (newToken) {
            token = newToken;
            return client.setAsync(token, JSON.stringify(data));
            // .then(function() {
            //     return client.expireAsync(token, TOKEN_EXPIRY_IN_SECONDS);
            // })
        })
        .then(function () {
            return {
                token: token,
                userdata: userData
            };
        });
};



var getUserData = function (token) {
    return getDataFromRedis(token)
        .then(function (data) {
            if (data) {
                return data.userData;
            }
            else {
                LOGGER.log.error('No token exists with ' + token);
                throw new Error('No such token exists');
            }
        });
};

var setUserData = function (token, userData) {
    return getDataFromRedis(token)
        .then(function (data) {
            data.userData = userData;
            return client.setAsync(token, JSON.stringify(data));
        });
}

var getValueInUserData = function (token, key) {
    return getDataFromRedis(token)
        .then(function (data) {
            if (data)
                return data.userData[key];
            else
                throw new Error('No such token exists');
        });
};

var setValueInUserData = function (token, key, value) {
    return getDataFromRedis(token)
        .then(function (data) {
            data.userData[key] = value;
            return client.set(token, JSON.stringify(data));
        });
};

var extractTokenFromRequest = function (req) {
    try {
        if (req.cookies && req.cookies[AUTH_TOKEN]) {
            return req.cookies[AUTH_TOKEN];
        } else if (req.headers[AUTH_TOKEN.toLowerCase()]) {
            return req.headers[AUTH_TOKEN.toLowerCase()];
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
}

var extractExamTokenFromRequest = function(req) {
    try {
        if (req.cookies && req.cookies['onlineExam']) {
            return req.cookies['onlineExam'];
        } else if (req.headers['onlineExam'.toLowerCase()]) {
            return req.headers['onlineExam'.toLowerCase()];
        } else {
            return null;
        }
    } catch (err) {
        return null;
    }
}
// you can send authtoken in both cookie or the request

var isAuthenticated = function (req) {
    var token = extractTokenFromRequest(req);
    return validateToken(token);
};


var getUserDataFromRequest = function (req) {
    var token = extractTokenFromRequest(req);
    return getUserData(token);
}

var deleteToken = function (token) {
    return client.delAsync(token);
}

var getUserIdFromRequest = function (req) {
    var token = extractTokenFromRequest(req);
    return getUserIdFromToken(token);
}

var getUserRoleFromRequest = function (req) {
    var token = extractTokenFromRequest(req);
    return getUserRoleFromToken(token);
}

var getUserIdFromToken = function (token) {
    var decoded = jwt.decode(token);
    return decoded ? decoded.userId : undefined;
};

var getUserRoleFromToken = function (token) {
    var decoded = jwt.decode(token);
    return decoded ? decoded.role : undefined;
};

var getUserIdAndRoleFromRequest = function (req) {
    var token = extractTokenFromRequest(req);
    var decoded = jwt.decode(token);
    if (decoded) {
        return {userId: decoded.userId, role: decoded.role};
    } else {
        return {};
    }
};

var authAndCheckRedis = function (req) {
    var token = extractTokenFromRequest(req);
    if (token) {
        return getDataFromRedis(token)
            .then(function (data) {
                if (data) {
                    return "SUCCESS";
                } else {
                    return "EXPIRED";
                }
            });
    } else {
        return Promise.resolve("FAILED");
    }
};

module.exports = {
    REDIS_CLIENT:client,
    validateToken: validateToken,
    generateAuthToken:generateAuthToken,
    generateTokenAndSetUserData: generateTokenAndSetUserData,
    getUserData: getUserData,
    setUserData: setUserData,
    getValue: getValueInUserData,
    setValue: setValueInUserData,
    getDataFromRedis: getDataFromRedis,
    isAuthenticated: isAuthenticated,
    getUserDataFromRequest: getUserDataFromRequest,
    deleteToken: deleteToken,
    getUserIdFromToken: getUserIdFromToken,
    getUserIdFromRequest: getUserIdFromRequest,
    extractTokenFromRequest: extractTokenFromRequest,
    getUserRoleFromToken: getUserRoleFromToken,
    getUserRoleFromRequest: getUserRoleFromRequest,
    authAndCheckRedis: authAndCheckRedis,
    //authenticateAndSetCookie: authenticateAndSetCookie,
    getUserIdAndRoleFromRequest: getUserIdAndRoleFromRequest,
};

