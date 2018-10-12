var Comment = require(__BASE__ + "modules/database/models/comment");
var mongoose = require('mongoose');
var LOGGER = require(__BASE__ + "modules/utils/Logger");
var extend = require('util')._extend;
var Promise = require('bluebird');

var getCreateTemplate = function (parameters) {

    var template = {};
    for (var key in parameters) {
        switch (key) {
            case 'post':
            case 'user':
            case 'text':
                template[key] = parameters[key];
                break;
        }
    }
    ;

    template.timestamp = new Date();
    return template;
}

var getComments = function (rule, fields, options) {

    return new Promise(function (resolve, reject) {
        Comment.find(rule, fields, options).lean().exec(function (err, data) {
            if (!err) {
                resolve(data);
            } else {
                LOGGER.logErrorMessage('GetComments', err, rule);
                reject(new Error('Failed to get Comments'));
            }
        });
    });
}

var getCommentsPopulated = function (rule, fields, options) {

    return new Promise(function (resolve, reject) {
        Comment.find(rule, fields, options)
            .populate([
                {
                    path: "user",
                    select: '_id firstname lastname profilePic'
                }
            ])
            .exec(function (err, data) {
                if (!err) {
                    resolve(data);
                } else {
                    LOGGER.logErrorMessage('getCommentsPopulated', err, rule);
                    reject(new Error('Failed to get CommentsPopulated'));
                }
            });
    });

};

var deleteComment = function (rule) {

    return new Promise(function (resolve, reject) {
        Comment.remove(rule, function (err, oldData) {
            if (!err) {
                resolve(oldData);
            } else {
                LOGGER.logErrorMessage('DeleteComment', err, rule);
                reject(new Error('Failed to delete Comment'));
            }
        });
    });

}

var createComment = function (parameters) {
    return new Promise(function (resolve, reject) {
        var template = getCreateTemplate(parameters);
        var record = new Comment(template);
        record.save(function (err, data) {
            if (!err) {
                resolve(data)
            } else {
                LOGGER.logErrorMessage('CreateComment', err, template);
                reject(new Error('Failed to create Comment'));
            }
        });
    });
};


module.exports = {
    getComments: getComments,
    deleteComment: deleteComment,
    createComment: createComment,
    deleteComment: deleteComment,
    getCommentsPopulated: getCommentsPopulated
};
