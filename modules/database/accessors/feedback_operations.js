let Feedback = require(__BASE__ + 'modules/database/models/feedback');
let customUUID = require(__BASE__ + "modules/utils/CustomUUID");
let Promise = require('bluebird');


let getCreateTemplate = function (parameters) {

    let template = {};
    for (let key in parameters) {
        switch (key) {
            case '_id':
            case 'created_at':
            case 'userid':
            case 'reaction':
            case 'comment':
                template[key] = parameters[key];
                break;
        }
    }
    template.created_at = new Date();

    if (!template._id) {
        template._id = customUUID.getRandomAplhaNumeric();
    }
    return template;
};



let createFeedback = function (parameters) {
    return new Promise(function(resolve, reject) {
        let template = getCreateTemplate(parameters);
        /*Store the user using the template*/
        let feedback = new Feedback(template);
        feedback.save(function(err, data) {
            if (!err) {
                resolve(data);
            } else {
                console.log(err);
                reject(new Error('createFeedback failed'));
            }
        });
    });
};


let getFeedback = function (rule, fields, options) {
    return new Promise(function (resolve, reject) {
        Feedback.find(rule, fields, options).exec(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                reject(new Error('Failed to get Feedback'));
            }
        });
    });
};


module.exports = {
    createFeedback:createFeedback,
    getFeedback:getFeedback

};