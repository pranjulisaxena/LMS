import { clerkClient } from "@clerk/express";
import Course from "../models/Course.js";
import {v2 as cloudinary} from 'cloudinary'
import { Purchase } from "../models/Purchase.js";
import User from "../models/User.js";

import EducatorRequest from "../models/EducatorRequest.js";
// import { clerkClient } from "@clerk/express";


// ✅ USER → Send request
export const requestEducatorRole = async (req, res) => {
  try {
    const userId = req.auth().userId;

    const { name, email, experience, skills, portfolio, image } = req.body;

    const existing = await EducatorRequest.findOne({ userId });

    if (existing) {
      return res.json({
        success: false,
        message: "Request already sent"
      });
    }

    await EducatorRequest.create({
      userId,
      name,
      email,
      experience,
      skills,
      portfolio,
      image
    });

    res.json({
      success: true,
      message: "Request submitted successfully"
    });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// ✅ ADMIN → Get all requests
export const getAllRequests = async (req, res) => {
  try {
    const requests = await EducatorRequest.find().sort({ createdAt: -1 });

    res.json({ success: true, requests });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// ✅ ADMIN → Approve
export const approveEducatorRole = async (req, res) => {
  try {
    const { requestId, userId } = req.body;

    await EducatorRequest.findByIdAndUpdate(requestId, {
      status: "approved"
    });

    // 🔥 Update Clerk Role
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: "educator"
      }
    });

    res.json({ success: true, message: "Approved successfully" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// ✅ ADMIN → Reject
export const rejectEducatorRole = async (req, res) => {
  try {
    const { requestId } = req.body;

    await EducatorRequest.findByIdAndUpdate(requestId, {
      status: "rejected"
    });

    res.json({ success: true, message: "Rejected" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};



// Update role to educator
export const updateRoleToEducator = async (req, res) =>{
    try{
        const userId = req.auth().userId

        await clerkClient.users.updateUserMetadata(userId, {
            publicMetadata: {
                role: 'educator',
            }
        })


        res.json({success: true, message: 'You can publish a course now'})
    }catch (error){
        res.json({success: false, message: error.message})
    }
}

// Add New Course
export const addCourse = async (req, res) =>{
    try {
        const { courseData } = req.body
        const imageFile = req.file
        const educatorId = req.auth().userId

        if(!imageFile){
            return res.json({success: false, message: 'Thumbnail Not Attached'})
        }

        const parsedCourseData = await JSON.parse(courseData)
        parsedCourseData.educator = educatorId
        const newCourse = await Course.create(parsedCourseData)
       const imageUpload = await cloudinary.uploader.upload(imageFile.path)
       newCourse.courseThumbnail = imageUpload.secure_url
       await newCourse.save()

        res.json({success: true, message: 'Course Added'})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// Get Educator Courses

export const getEducatorCourses = async (req, res) =>{
    try {
        const educator = req.auth().userId
        const courses = await Course.find({educator})
        res.json({success: true, courses})

    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// Get Educator Dashboard Data ( Total Earnings, Enrolled Students, No. of Courses)

export const educatorDashboardData = async (req, res) =>{
    try {
        const educator = req.auth().userId;
        const courses = await Course.find({educator});
        const totalCourses = courses.length;

        const courseIds = courses.map(course => course._id);
        
        // Calculate total earnings from purchases
        const purchases = await Purchase.find({
            courseId: {$in: courseIds},
                status: 'completed'
            
        });

        const totalEarnings = purchases.reduce((sum, purchase) => sum + purchase.amount, 0);

        // Collect unique enrolled student IDs with their course titles
        const enrolledStudentsData = [];
        for(const course of courses){
            const students = await User.find({
                _id: {$in: course.enrolledStudents}
            }, 'name imageUrl');

            students.forEach(student => {
                enrolledStudentsData.push({
                    courseTitle: course.courseTitle,
                    student
                });
            });
        }

        res.json({success: true, dashboardData: {
            totalEarnings, enrolledStudentsData, totalCourses
        }})

    } catch (error) {
        res.json({success: false, message: error.message});
    }
}

// Get Enrolled Students Data Purchase Data
export const getEnrolledStudentsData = async (req, res) =>{
  try {
    const educator = req.auth().userId;
    const courses = await Course.find({educator});
    const courseIds = courses.map(course => course._id);

    const purchases = await Purchase.find({
        courseId: {$in: courseIds},
        status: 'completed'
    }).populate('userId', 'name imageUrl').populate('courseId', 'courseTitle')

    const enrolledStudents = purchases.map(purchase => ({
        student: purchase.userId,
        courseTitle: purchase.courseId.courseTitle,
        purchaseDate: purchase.createdAt
    }));

    res.json({success: true, enrolledStudents})

  } catch (error) {
    res.json({success: false, message: error.message});
  }
}