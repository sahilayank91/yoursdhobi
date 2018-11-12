let feedbackOperations = require(__BASE__+"modules/database/accessors/feedback_operations");

let getFeedback = function(parameters){
    return feedbackOperations.getFeedback(parameters)
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('No User exists with given useremail');
            }
        }).catch(function(error){
            console.log("Error in get Users: ",error);
        });

};

let submitFeedback = function(parameters){
    return feedbackOperations.createFeedback(parameters)
        .then(function(data){
            if(data){
                return data;
            }else{
                throw new Error('No User exists with given useremail');
            }
        }).catch(function(error){
            console.log("Error in get Users: ",error);
        });

};

module.exports = {
    getFeedback:getFeedback,
    submitFeedback:submitFeedback
};