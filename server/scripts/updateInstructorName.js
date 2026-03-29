const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../models/User");

// Update instructor name from "Vikash Doller" to "Satish Doller"
async function updateInstructorName() {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to database");

        // Find user with firstName "Vikash" and lastName "Doller"
        const updatedUser = await User.findOneAndUpdate(
            { 
                firstName: "Vikash", 
                lastName: "Doller" 
            },
            { 
                firstName: "Satish",
                lastName: "Doller"
            },
            { new: true } // Return the updated document
        );

        if (updatedUser) {
            console.log("Successfully updated instructor name:");
            console.log(`From: Vikash Doller`);
            console.log(`To: ${updatedUser.firstName} ${updatedUser.lastName}`);
            console.log(`Email: ${updatedUser.email}`);
        } else {
            console.log("No user found with name 'Vikash Doller'");
            
            // Let's search for any user with firstName "Vikash"
            const vikashUsers = await User.find({ firstName: "Vikash" });
            if (vikashUsers.length > 0) {
                console.log("Found users with firstName 'Vikash':");
                vikashUsers.forEach(user => {
                    console.log(`- ${user.firstName} ${user.lastName} (${user.email})`);
                });
            } else {
                console.log("No users found with firstName 'Vikash'");
            }
        }

        // Close connection
        await mongoose.disconnect();
        console.log("Database connection closed");

    } catch (error) {
        console.error("Error updating instructor name:", error);
        process.exit(1);
    }
}

updateInstructorName();
