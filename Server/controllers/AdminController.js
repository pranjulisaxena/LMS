import User from "../models/User.js";
import { Purchase } from "../models/Purchase.js";
import Course from "../models/Course.js";
import { clerkClient } from "@clerk/express";
import { CourseProgress } from "../models/CourseProgress.js";

export const deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    // 1️⃣ Delete from Clerk
    await clerkClient.users.deleteUser(userId);

    // 2️⃣ Delete user from DB
    const user = await User.findByIdAndDelete(userId);

    // 3️⃣ Remove user from all courses
    await Course.updateMany(
      { enrolledStudents: userId },
      { $pull: { enrolledStudents: userId } }
    );

    // 4️⃣ Delete all purchases
    await Purchase.deleteMany({ userId });

    // 5️⃣ Delete courses posted by the user
    const coursesToDelete = await Course.find({ educator: userId });
    for (const course of coursesToDelete) {
      // Remove course from all users' enrolledCourses
      await User.updateMany(
        { enrolledCourses: course._id },
        { $pull: { enrolledCourses: course._id } }
      );
      // Delete Course Progress
      await CourseProgress.deleteMany({ courseId: course._id });
      // Delete all purchases for this course
      await Purchase.deleteMany({ courseId: course._id });
      // Delete the course
      await Course.findByIdAndDelete(course._id);
    }

    res.json({ success: true, message: "User and their courses deleted everywhere" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
export const deletingCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    // 2️⃣ Delete course from DB
    const course = await Course.findByIdAndDelete(courseId);

    // 3️⃣ Remove course from all users
    await User.updateMany(
      { enrolledCourses: courseId },
      { $pull: { enrolledCourses: courseId } }
    );

    // Delete Course Progress

    await CourseProgress.deleteMany({ courseId });

    // 4️⃣ Delete all purchases
    await Purchase.deleteMany({ courseId });

    res.json({ success: true, message: "Course deleted everywhere" });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { courseTitle, courseDescription } = req.body;

    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { courseTitle, courseDescription },
      { new: true }
    );

    if (!updatedCourse) {
      return res.json({ success: false, message: "Course not found" });
    }

    res.json({ success: true, message: "Course updated successfully", course: updatedCourse });

  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const gettingAllUsers = async (req, res) =>{
     try {
        const data = await User.find()
        res.json({success: true, users: data})
     } catch (error) {
        res.json({success: false, message: error.message})
     }
}
export const gettingAllCourses = async (req, res) =>{
     try {
    const data = await Course.find()
    res.json({success: true, courses: data})
 } catch (error) {
    res.json({success: false, message: error.message})
 }
}
export const gettingAllPurchases = async (req, res) =>{
     try {
        const data = await Purchase.find()
        res.json({success: true, purchases: data})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}

// Admin Activity

export const getAdminActivity = async (req, res) => {
  try {
    // 🔹 Fetch latest data (limit for performance)
    const users = await User.find().sort({ createdAt: -1 }).limit(5);
    const courses = await Course.find().sort({ createdAt: -1 }).limit(5);
    const purchases = await Purchase.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("courseId"); // to get course title

    // 👤 User Activity
    const userActivity = users.map((u) => ({
      message: `New user registered: ${u.name}`,
      createdAt: u.createdAt,
    }));

    // 📚 Course Activity
    const courseActivity = courses.map((c) => ({
      message: `Course "${c.courseTitle}" added`,
      createdAt: c.createdAt,
    }));

    // 💳 Purchase Activity
    const purchaseActivity = purchases.map((p) => ({
      message: `Payment received $${p.amount} for "${p.courseId?.courseTitle}"`,
      createdAt: p.createdAt,
    }));

    // 🔥 Merge all
    const allActivity = [
      ...userActivity,
      ...courseActivity,
      ...purchaseActivity,
    ];

    // 🧠 Sort latest first
    allActivity.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // 🎯 Send top 10
    res.json(allActivity.slice(0, 15));

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};