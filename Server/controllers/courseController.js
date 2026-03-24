import Course from "../models/Course.js";

// Get All Courses
export const getAllCourse = async (req, res) => {
    try {
        const courses = await Course.find({isPublished: true}).select(['-courseContent', '-enrolledStudents']).populate({path: 'educator'})

        res.json({success: true, courses})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// Get Coruse by Id
export const getCoruseId = async (req, res) =>{
    const {id} = req.params
    try {
        const coursesData = await Course.findById(id).populate({path: 'educator'})

        // Remove lectureUrl if isPreviewFree is false
        coursesData.courseContent.forEach(chapter => {
            chapter.chapterContent.forEach(lecture => {
                if(!lecture.isPreviewFree){
                    lecture.lectureUrl = "";
                }
            })
        })

        res.json({success: true, coursesData})
        
    } catch (error) {
         res.json({success: false, message: error.message})
    }
}