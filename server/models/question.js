var mongoose = require('mongoose')
var Schema = mongoose.Schema;

var questionSchema = new Schema({
	title : String,
	question : String,
	userlist : [{ type: Schema.Types.ObjectId, ref: 'User' }]
})

var Question = mongoose.model('Question', questionSchema)

module.exports = Question