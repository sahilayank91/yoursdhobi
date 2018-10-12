/*This schema is for the auto increment counter in the database while doing the fresher registration*/
/*The counter schema can be used for another places also*/

/*Created by Sahil Ayank on 9th of September 2018*/

var mongoose = require('mongoose');
var CounterSchema = new mongoose.Schema({
	_id: String,
	sequence_value:{type:Number},
}, {
	minimize: false
});

// CounterSchema.index({_id:1});

module.exports = mongoose.model('Counter', CounterSchema);
