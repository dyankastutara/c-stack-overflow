const express = require('express')
const router = express.Router()
const passport = require('passport')

var controll = require('../controllers/userController')

router.get('/',controll.getAll)
router.get('/:username',controll.findByUsername)
router.post('/signup',controll.signup)
router.delete('/remove/:id',controll.remove)
router.post('/signin', passport.authenticate('local', { session: false }), controll.signin)
router.post('/validate', controll.userValidation);

module.exports = router