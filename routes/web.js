const express = require('express')
const FrontController = require('../controllers/FrontController')
const StudentController = require('../controllers/StudentController')
const HodController = require('../controllers/HodController')
const CompanyController = require('../controllers/CompanyController')
const checkAuth =require('../middleware/auth')//from middleware ...we use for security
const JobController = require('../controllers/JobController')
const route =express.Router()
const upload  = require("../middleware/multer")



route.get('/',FrontController.home)
route.get('/about',FrontController.about)
route.get('/contact',FrontController.contact)
route.get('/login',FrontController.login)
route.get('/register',FrontController.register)
route.get('/dashboard',checkAuth,FrontController.dashboard)
//insert admin login
route.post('/registerAdmin',FrontController.registerAdmin)
//insert login
route.post('/verifylogin',FrontController.verifylogin)
route.get('/logout',FrontController.logout)
// student controller 
route.get('/student/display',checkAuth,StudentController.display)
route.post('/student/insert',checkAuth,upload.single("image"),StudentController.insertStudent)
route.get('/studentDelete/:id',checkAuth,StudentController.studentDelete)
route.get('/studentView/:id',checkAuth,StudentController.studentView)
route.get('/studentEdit/:id',checkAuth,StudentController.studentEdit)
route.post('/studentUpdate/:id',checkAuth,upload.single("image"),StudentController.studentUpdate)


// HOD controller
route.get('/hod/display',checkAuth, HodController.display)
route.post('/insert/hod',checkAuth,upload.single("image"),HodController.insertHod)
route.get('/hodDelete/:id',HodController.hodDelete)
route.get('/hodView/:id',checkAuth,HodController.hodView)
route.get('/hodEdit/:id',checkAuth,HodController.hodEdit)
route.post('/hodUpdate/:id',checkAuth,upload.single("image"),HodController.hodUpdate)


// company controller 
route.get('/company/display',checkAuth, CompanyController.display)
route.post('/insert/company',checkAuth,upload.single("image"),CompanyController.insertCompany)
route.get('/companyDelete/:id',CompanyController.companyDelete)
route.get('/companyView/:id',checkAuth,CompanyController.companyView)
route.get('/companyEdit/:id',checkAuth,CompanyController.companyEdit)
route.post('/companyUpdate/:id',checkAuth,upload.single("image"),CompanyController.companyUpdate)

//

// Company opening display job
route.get('/company/jobs',checkAuth,JobController.AllJobs)
route.post('/company/jobs/add',checkAuth,JobController.AddJobs)
route.post('/company/jobs/update/:id', JobController.UpdateJob)
route.post('/company/jobs/delete/:id', JobController.DeleteJob)

//Student ke liye job list
route.get('/student/jobs',checkAuth,JobController.showJobsForStudent)







module.exports =route