require("dotenv").config({ path: "./.env" });
const mailSender = require("./utils/mailSender");

async function test() {
    try {
        console.log("Testing email to kkumarraj72092@gmail.com...");
        const res = await mailSender("kkumarraj72092@gmail.com", "Test Email", "<h1>This is a test email</h1>");
        console.log("Email Result:", res);
    } catch (e) {
        console.log("Error:", e);
    }
}
test();
