import express from 'express'
import { deleteUser, deletingCourse, getAdminActivity, getAdminData, gettingAllCourses, gettingAllPurchases, gettingAllUsers, updateAdminData, updateCourse } from '../controllers/AdminController.js'

const adminRouter = express.Router()

adminRouter.get('/allCourses', gettingAllCourses)
adminRouter.get('/allUsers', gettingAllUsers)
adminRouter.get('/allPurchases', gettingAllPurchases)
adminRouter.delete('/deleteUser/:userId', deleteUser)
adminRouter.put('/updateCourse/:courseId', updateCourse) 
adminRouter.delete('/deleteCourse/:courseId', deletingCourse)
adminRouter.get('/activity', getAdminActivity)
adminRouter.get('/get-adminData', getAdminData)
adminRouter.put('/update-adminData', updateAdminData)

export default adminRouter;
