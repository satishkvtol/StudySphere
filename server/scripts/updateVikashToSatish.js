const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../models/User");

// Update instructor name from "satish doller" to "Satish Doller"
async function updateInstructorName() {
    try {
        // Connect to database
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to database");

        // Find and update user with firstName "satish" and lastName "doller"
        const updatedUser = await User.findOneAndUpdate(
            { 
                firstName: "satish", 
                lastName: "doller" 
            },
            { 
                firstName: "Satish",
                lastName: "Doller"
            },
            { new: true } // Return the updated document
        );

        if (updatedUser) {
            console.log("✅ Successfully updated instructor name:");
            console.log(`From: ${updatedUser.firstName === "Satish" ? "satish" : "Satish"} ${updatedUser.lastName === "Doller" ? "doller" : "Doller"}`);
            console.log(`To: ${updatedUser.firstName} ${updatedUser.lastName}`);
            console.log(`Email: ${updatedUser.email}`);
            console.log(`Account Type: ${updatedUser.accountType}`);
        } else {
            console.log("❌ No user found with name 'satish doller'");
        }

        // Close connection
        await mongoose.disconnect();
        console.log("\nDatabase connection closed");

    } catch (error) {
        console.error("❌ Error updating instructor name:", error);
        process.exit(1);
    }
}

updateInstructorName();
