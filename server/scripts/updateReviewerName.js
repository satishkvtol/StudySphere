const mongoose = require("mongoose");
require("dotenv").config();
const User = require("../models/User");
const RatingAndReview = require("../models/RatingAndReview");

async function updateReviewerName() {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to database");

        // Search for user with "sonam verma" or similar
        const searchUsers = await User.find({
            $or: [
                { firstName: /sonam/i },
                { lastName: /sonam/i },
                { firstName: /verma/i },
                { lastName: /verma/i }
            ]
        });

        console.log("Found users:");
        searchUsers.forEach(user => {
            console.log(`- ${user._id}: ${user.firstName} ${user.lastName}`);
        });

        for (let user of searchUsers) {
            if (user.firstName.toLowerCase().includes("sonam") || user.lastName.toLowerCase().includes("sonam")) {
                console.log(`Updating ${user.firstName} ${user.lastName} to Radhika verma`);
                
                // Usually reviews show "firstName lastName"
                // Change to Radhika verma
                user.firstName = "Radhika";
                user.lastName = "verma";
                await user.save();
                console.log(`Updated user ${user._id} to ${user.firstName} ${user.lastName}`);
            }
        }

        await mongoose.disconnect();
        console.log("Done");

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

updateReviewerName();
