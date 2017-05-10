const User = require('../models/user')
const controll = require('../controllers/userController')
const passport = require('passport')
const bcrypt = require('bcrypt-nodejs')
var methods={}

methods.passportLocal = function(username, password, next){
	User.findOne({
		username : username
	},function(err,data){
		if (err){
			return next(err)
		}

		if (data==null){
			return next(null, {msg: 'Username or Password is Wrong'})
		}

		if (!bcrypt.compareSync(password, data.password)){
			return next(null, {msg: 'Username or Password is Wrong'})
		}

		return next(null, data)
	})
}

module.exports = methods