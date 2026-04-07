import {Webhook} from 'svix'
import User from '../models/User.js'
import { Purchase } from "../models/Purchase.js";
import Course from "../models/Course.js";
import { CourseProgress } from "../models/CourseProgress.js";


// API Controller Function to Manage Clerk User with database

export const clerkWebhooks = async (req, res) =>{
try {
    console.log("Clerk Webhook Hit")

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET)

    const payload = req.body.toString();

    await whook.verify(payload, {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"]
    })
    const { data, type } = JSON.parse(payload);
    // console.log("data : ", data, "\ntype : ", type);

    switch (type) {
        case 'user.created': {
    
            const userData = {
                _id: data.id,
                email: data.email_addresses[0].email_address,
                name: data.first_name + " " + data.last_name,
                imageUrl: data.image_url, 
            }

            await User.create(userData)
            res.json({})
            break;
        }
        case 'user.updated': {
            const userData = {
                email: data.email_addresses[0].email_address,
                name: data.first_name + " " + data.last_name,
                imageUrl: data.image_url, 
            }

            await User.findByIdAndUpdate(data.id, userData)
            res.json({})
            break;
        }

        case 'user.deleted': {
            await User.findByIdAndDelete(data.id)

            const userId = data.id

            
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

            res.json({})
            break;
        }
        default:
            break;
    }
} catch (error) {
    res.json({success: false, message: error.message})
}
}

