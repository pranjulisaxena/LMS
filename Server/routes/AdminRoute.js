import express from 'express'
import { deleteUser, deletingCourse, getAdminActivity, gettingAllCourses, gettingAllPurchases, gettingAllUsers, updateCourse } from '../controllers/AdminController.js'

const adminRouter = express.Router()

adminRouter.get('/allCourses', gettingAllCourses)
adminRouter.get('/allUsers', gettingAllUsers)
adminRouter.get('/allPurchases', gettingAllPurchases)
adminRouter.delete('/deleteUser/:userId', deleteUser)
adminRouter.put('/updateCourse/:courseId', updateCourse) 
adminRouter.get('/activity', getAdminActivity)

export default adminRouter;
