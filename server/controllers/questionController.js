var Question = require('../models/question')
var bcrypt = require('bcrypt-nodejs')
var jwt = require('jsonwebtoken')

var methods = {}


methods.insert = function(req, res){
	Question.create(req.body)
	.then(function(data){
		res.send("Data Added")
	})
	.catch(function(err){
		res.send(err)
	})
}

methods.remove = function(req, res){
	Question.remove({
		_id : req.params.id
	})
	.then(function(){
		res.send('Data is Deleted')
	})
	.catch(function(err){
		res.send(err)
	})
}

methods.getAll = function(req, res){
	Question.find(function(err, query){
		if(!err){
			res.send(query)
		}else{
			res.send(err)
		}
	})
}

// methods.findByIdQuestion = function(req,res){
// 	Question.findOne({
// 		_id : req.params.id
// 	})
// 	.then(function(data){
// 		if(!data){
// 			res.send("Data is Empty")
// 		}else{
// 			res.send(data)
// 		}
// 	})
// }

methods.update = function(req,res){
	Question.findOne({
		_id : req.body.id
	})
	.then(function(data){
		Question.update({
			_id: data.id
		})
		},{
			$set:{
				title : req.body.title || data.title,
				question : req.body.question || data.question,
				userlist : data.userlist
			}
		},{
			new : true
		}, function(err,result){
			if(err){
				res.send(err)
			}else{
				res.send(result)
			}
		})
	.catch(function(err){
		res.send('Data is Empty')
	})
}
module.exports = methods