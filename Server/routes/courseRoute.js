import express from 'express'
import { getAllCourse, getCoruseId } from '../controllers/courseController.js'

const courseRouter = express.Router()

courseRouter.get('/all', getAllCourse)
courseRouter.get('/:id', getCoruseId)

export default courseRouter;
