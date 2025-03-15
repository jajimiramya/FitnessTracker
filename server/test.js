const mongoose = require("mongoose");

// Replace <username> and <password> with your MongoDB Atlas credentials
mongoose.connect("mongodb+srv://ramyajajimi:SlZ2JDZfeOLcaSpU@myfitnessapp.vmn2r.mongodb.net/fitnessDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connection Successful"))
.catch((err) => console.error("❌ MongoDB Connection Error:", err));

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model("User", UserSchema);

async function testInsert() {
    try {
        const newUser = new User({
            name: "Manual User",
            email: "manual@example.com",
            password: "test123"
        });

        await newUser.save();
        console.log("✅ User saved successfully in MongoDB!");
    } catch (error) {
        console.error("❌ Error saving user:", error);
    } finally {
        mongoose.connection.close();
    }
}

// Run the test function
testInsert();
