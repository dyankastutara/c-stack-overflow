const express = require('express')
const router = express.Router()

var controll = require('../controllers/questionController')

router.get('/',controll.getAll)
router.post('/',controll.insert)
router.put('/:id',controll.update)
router.delete('/remove/:id',controll.remove)

module.exports = router