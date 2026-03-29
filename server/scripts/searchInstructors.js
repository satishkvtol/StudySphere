const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../models/User");
const Course = require("../models/Course");

// Search for all instructors and their courses
async function searchInstructors() {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to database");

        // Find all users with accountType "Instructor"
        const instructors = await User.find({ accountType: "Instructor" });
        
        console.log(`\nFound ${instructors.length} instructors:`);
        instructors.forEach((instructor, index) => {
            console.log(`${index + 1}. ${instructor.firstName} ${instructor.lastName} (${instructor.email})`);
        });

        // Also search for any user that might be an instructor in courses
        console.log("\nSearching for courses with instructors...");
        const courses = await Course.find({}).populate('instructor', 'firstName lastName email');
        
        console.log(`\nFound ${courses.length} courses:`);
        courses.forEach((course, index) => {
            if (course.instructor) {
                console.log(`${index + 1}. Course: ${course.courseName}`);
                console.log(`   Instructor: ${course.instructor.firstName} ${course.instructor.lastName} (${course.instructor.email})`);
            }
        });

        // Search for any user containing "Vikash" or "Doller" in their name
        console.log("\nSearching for users with 'Vikash' or 'Doller' in their name...");
        const searchUsers = await User.find({
            $or: [
                { firstName: /vikash/i },
                { lastName: /vikash/i },
                { firstName: /doller/i },
                { lastName: /doller/i }
            ]
        });

        if (searchUsers.length > 0) {
            console.log("Found matching users:");
            searchUsers.forEach((user, index) => {
                console.log(`${index + 1}. ${user.firstName} ${user.lastName} (${user.email}) - Account Type: ${user.accountType}`);
            });
        } else {
            console.log("No users found with 'Vikash' or 'Doller' in their name");
        }

        // Close connection
        await mongoose.disconnect();
        console.log("\nDatabase connection closed");

    } catch (error) {
        console.error("Error searching instructors:", error);
        process.exit(1);
    }
}

searchInstructors();
