const { User } = require("./models");
const mongoose = require("mongoose");
const { connectDB } = require("./config/database");

const testLogin = async () => {
  try {
    await connectDB();
    console.log("✅ Database connected");

    // Find admin user
    const admin = await User.findOne({ email: "admin@kambaa.in" });

    if (!admin) {
      console.log("❌ Admin user not found in database");
      process.exit(1);
    }

    console.log("\n📋 Admin user found:");
    console.log("ID:", admin._id.toString());
    console.log("Username:", admin.username);
    console.log("Email:", admin.email);
    console.log("Role:", admin.role);
    console.log("Password hash:", admin.password);

    // Test password
    const password = "admin123";
    console.log("\n🔐 Testing password:", password);

    const isMatch = await admin.matchPassword(password);
    console.log("Password match result:", isMatch);

    if (isMatch) {
      console.log("✅ Password verification successful!");
    } else {
      console.log("❌ Password verification failed!");
    }

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error:", error);
    try {
      await mongoose.disconnect();
    } catch (_) {}
    process.exit(1);
  }
};

testLogin();
