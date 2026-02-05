const mongoose = require("mongoose");
const { connectDB } = require("./config/database");
const { User, Category } = require("./models");

const seedDatabase = async () => {
  try {
    console.log("🌱 Seeding database (MongoDB)...");
    await connectDB();

    await mongoose.connection.dropDatabase();
    console.log("✅ Database dropped");

    await User.create({
      username: "admin",
      email: "admin@kambaa.in",
      password: "admin123",
      role: "ADMIN",
    });
    console.log("✅ Admin user created");

    await User.create([
      {
        username: "john_doe",
        email: "john.doe@kambaa.in",
        password: "employee123",
        role: "EMPLOYEE",
      },
      {
        username: "jane_smith",
        email: "jane.smith@kambaa.in",
        password: "employee123",
        role: "EMPLOYEE",
      },
    ]);
    console.log("✅ Employee users created");

    await Category.create([
      { name: "Technology", description: "Tech-related articles" },
      { name: "Development", description: "Software development" },
      { name: "Design", description: "UI/UX and design" },
      { name: "Best Practices", description: "Industry best practices" },
      { name: "Tutorials", description: "Step-by-step guides" },
      { name: "Documentation", description: "Project documentation" },
    ]);
    console.log("✅ Categories created");

    console.log("\n🎉 Database seeded successfully!\n");
    console.log("📝 Test Credentials:");
    console.log("Admin:");
    console.log("  Email: admin@kambaa.in");
    console.log("  Password: admin123");
    console.log("\nEmployee:");
    console.log("  Email: john.doe@kambaa.in");
    console.log("  Password: employee123");
    console.log("\n");

    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    try {
      await mongoose.disconnect();
    } catch (_) {}
    process.exit(1);
  }
};

seedDatabase();
