let mongoose = require('mongoose');
let SuggestionSchema = new mongoose.Schema(
    {
        _id:{type:String},
        posted_by: {type: String, ref: 'User', required: true},
        create_time: {type: Date, required: true},
        user:{type:String, ref:'User', required:true},
        post:{type:String, ref:'Post'},
        answer_posted:{type:String},
        text:{type:String}
    },
    {
        minimize: false
    }
);

module.exports = mongoose.model('Suggestion', SuggestionSchema);
