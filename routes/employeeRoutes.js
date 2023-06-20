const express = require('express');
const router = express.Router();

const employeeController=require('../controllers/employeeController')

router.post('/employeeLaptop',employeeController.createLaptop)
router.get('/employeeLaptop',employeeController.getLaptop)

module.exports=router