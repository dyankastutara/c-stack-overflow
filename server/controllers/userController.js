var User = require('../models/user')
var bcrypt = require('bcrypt-nodejs')
var jwt = require('jsonwebtoken')

var methods = {}

methods.signup = function(req, res){
	User.findOne({
		username: req.body.username
	})
	.then(function(query){
		if(!query){
			if(req.body.username.length == 0){
				res.send('Username cannot null')
			}else if(req.body.password.length < 4){
				res.send('Password must be minimum length 4 characters')
			}else{
				User.create({
					name: req.body.name,
					username: req.body.username,
					password: bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10), null)
				})
				.then(function(data){
					res.send("Data Added")
				})
				.catch(function(err){
					res.send(err)
				})
			}
		}else{
			res.send('Username already exists')
		}
	})
}

methods.signin = function(req, res){
	var user = req.user
	var token = jwt.sign({
		id : user._id,
		name : user.name,
		username : user.username
	}, 'secret', {expiresIn : '1h'})
	res.send({
		'token' : token
	})
}

methods.userValidation = function(req, res){
	jwt.verify(req.body.token, 'secret', function(err, decoded){
		if(err){
			res.send("Not Valid")
		}else{
			res.send(decoded)
		}
	})
}

methods.remove = function(req, res){
	User.remove({
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
	User.find(function(err, query){
		if(!err){
			res.send(query)
		}else{
			res.send(err)
		}
	})
}

methods.findByUsername = function(req,res){
	User.findOne({
		username : req.params.username
	})
	.then(function(data){
		if(!data){
			res.send("Data is Empty")
		}else{
			res.send(data)
		}
	})
}

// methods.update = function(req,res){
// 	User.findOne({
// 		username : req.body.username
// 	})
// 	.then(function(data){
// 		User.update({
// 			_id: data.id
// 		})
// 	},{
// 		$set:{
// 			name : req.body.name || data.name,
// 			password : req.body.password || password
// 		}
// 	},{
// 		new : true
// 	}, function(err,result){
// 		if(err){
// 			res.send(err)
// 		}else{
// 			res.send(result)
// 		}
// 	})
// 	.catch(function(err){
// 		res.send('Data is Empty')
// 	})
// }
module.exports = methods