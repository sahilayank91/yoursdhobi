var mongoose = require('mongoose');
var CurriculumSchema = new mongoose.Schema({
    _id: String,
    semester: {type: String},
    credits: {type:Number},
    subject: {type:String, required:true},

    create_time: {type: Date, default: new Date()},
}, {
    minimize: false
});


module.exports = mongoose.model('Curriculum', CurriculumSchema);
