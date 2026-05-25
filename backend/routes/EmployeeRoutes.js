const { update, create, deletes, getEmployees } = require('../controller/EmployeeController')
const IsAuth= require('../middleware/AuthMiddleware')

const router= require('express').Router()
router.post('/',IsAuth,create)
router.put('/:EmployeeID',IsAuth,update)
router.delete('/:EmployeeID',IsAuth,deletes)
router.get('/',IsAuth,getEmployees)

module.exports= router