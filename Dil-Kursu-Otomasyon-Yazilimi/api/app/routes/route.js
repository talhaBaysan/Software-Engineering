const express = require('express');
// const mysqlConnection = require("../config/db_config");
const router = express.Router();
const loginC = require('../controllers/loginController')
const studentC = require('../controllers/studentController')
const branchC = require('../controllers/branchController')
const courseC = require('../controllers/courseContoller')
// api links
router.post('/login', loginC.login)
router.post('/register-student',studentC.createStudents)
router.get('/show-students',studentC.showStudents)
router.post('/find-student',studentC.findOne)
router.post('/delete-student',studentC.deleteStudent)
router.post('/delete-student-from-course',studentC.deleteStudentFromCourse)
router.post('/get-installment',studentC.getInstallment)
router.post('/add-to-course',studentC.addToCourse)
router.post('/show-languages-branch',branchC.showLanguagesOne)
router.post('/show-courses-branch',branchC.showCoursesOne)
router.get('/show-branchs',branchC.showBranchs)
router.get('/show-courses',courseC.showCourses)
module.exports = router;

