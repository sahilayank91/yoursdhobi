var User = require(__BASE__ + 'modules/database/models/user');
var Notification = require(__BASE__ + 'modules/database/models/notification');
var customUUID = require(__BASE__ + "modules/utils/CustomUUID");
var Promise = require('bluebird');
let LOGGER = require(__BASE__ + "modules/utils/Logger");

let getNotificationCreateTemplate = function (parameters) {

    let template = {};
    for (let key in parameters) {
        switch (key) {
            case 'post':
            case 'text':
            case 'type':
            case 'user':
            case 'postedBy':
                template[key] = parameters[key];
                break;
        }
    }
    if (!template._id) {
        template._id = customUUID.getRandomAplhaNumeric();
    }

    template.create_time = new Date();
    // template.update_time = template.create_time;
    return template;
};




let createNotification = function (parameters) {
    return new Promise(function (resolve, reject) {
        let template = getNotificationCreateTemplate(parameters);
        let notification = new Notification(template);
        notification.save(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                LOGGER.logErrorMessage('CreatePost', err, template);
                reject(new Error('Failed to create Post'));
            }
        });
    });
};


let getNotification = function (rule, fields, options) {

    return new Promise(function (resolve, reject) {
        Notification.find(rule, fields, options).lean().exec(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                LOGGER.logErrorMessage('GetNotification', err, rule);
                reject(new Error('Failed to get Notification'));
            }
        });
    });
}

module.exports = {
    createNotification:createNotification,
    getNotification:getNotification
};