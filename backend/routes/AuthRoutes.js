const { login, register, getUsers } = require('../controller/AuthController')
const IsAuth = require('../middleware/AuthMiddleware')

const router= require('express').Router()
router.post('/login',login)
router.post('/register',register)
router.get('/users',IsAuth,getUsers)
module.exports= router