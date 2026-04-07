import express from 'express'
import { requireAuth } from '@clerk/express';
import { addCourse, approveEducatorRole, educatorDashboardData, getAllRequests, getEducatorCourses, getEnrolledStudentsData, rejectEducatorRole, requestEducatorRole, updateRoleToEducator } from '../controllers/educatorControllers.js'
import upload from '../configs/multer.js';
import { protectEducator } from '../middlewares/authMiddleware.js';

const educatorRouter = express.Router()


// Add Educator Role
// educatorRouter.get('/update-role', requireAuth(), updateRoleToEducator)
educatorRouter.post("/request-role", requestEducatorRole);
educatorRouter.get("/requests", getAllRequests);
educatorRouter.post("/approve-role", approveEducatorRole);
educatorRouter.post("/reject-role", rejectEducatorRole);
educatorRouter.post('/add-course', upload.single('image'), protectEducator, addCourse);
educatorRouter.get('/courses',protectEducator ,getEducatorCourses)
educatorRouter.get('/dashboard',protectEducator ,educatorDashboardData)
educatorRouter.get('/enrolled-students',protectEducator ,getEnrolledStudentsData)

export default educatorRouter;