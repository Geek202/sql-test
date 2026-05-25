const { create, getPost } = require('../controller/PostController')
const IsAuth = require('../middleware/AuthMiddleware')

const router= require('express').Router()
router.post('/',IsAuth,create)
router.get('/',getPost)
module.exports= router