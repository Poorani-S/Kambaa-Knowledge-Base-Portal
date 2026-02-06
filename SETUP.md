# KKBP Setup Guide

> Version 1.0.0 | Last Updated: February 6, 2026

## Complete Setup Instructions

### Step 1: Install MongoDB (if not already installed)

**Recommended Version:** MongoDB 6.0 or higher

#### Option A: MongoDB Community Server

1. Download MongoDB Community Server from: https://www.mongodb.com/try/download/community
2. Install MongoDB (choose "Complete" installation)
3. MongoDB Compass (GUI) will be installed automatically
4. Start MongoDB service

#### Option B: MongoDB Atlas (Cloud - Free Tier)

1. Create a free account at: https://www.mongodb.com/cloud/atlas/register
2. Create a free cluster (M0 Sandbox)
3. Get your connection string
4. Skip to Step 3 and use the Atlas connection string

#### Verify Installation

```bash
# Check MongoDB version
mongod --version

# Check if MongoDB is running
Get-Service MongoDB
```

### Step 2: Start MongoDB (Local Installation Only)

#### Windows:

MongoDB should start automatically. If not:

```powershell
# Start MongoDB service (Run as Administrator)
Start-Service MongoDB

# Or start manually
net start MongoDB
```

#### Verify MongoDB is Running:

```bash
# Connect to MongoDB shell
mongosh

# You should see MongoDB shell prompt
# Type 'exit' to quit
```

### Step 3: Configure Backend

1. Navigate to backend folder:

```bash
cd backend
```

2. Update `.env` file if needed:

```env
# For local MongoDB
MONGODB_URI=mongodb://127.0.0.1:27017/kkbp

# For MongoDB Atlas (if using cloud)
# MONGODB_URI=mongodb+srv://<username>:<password>@<cluster>.mongodb.net/kkbp?retryWrites=true&w=majority

JWT_SECRET=kambaa_kb_portal_secret_key_2026
PORT=5000
```

3. Install dependencies:

```bash
npm install
```

4. Seed the database (creates collections and sample data):

```bash
npm run seed
```

Expected output:

```
🌱 Seeding database...
✅ MongoDB connected
✅ Database cleared
✅ Admin user created
✅ Employee users created
✅ Categories created

🎉 Database seeded successfully!

📝 Test Credentials:
Admin:
  Email: admin@kambaa.in
  Password: admin123

Employee:
  Email: john.doe@kambaa.in
  Password: employee123
```

### Step 4: Start Backend Server

```bash
npm start
```

Or for development with auto-reload:

```bash
npm run dev
```

You should see:

```
✅ MongoDB connected
🚀 Server running on port 5000
```

### Step 5: Start Frontend

Open a NEW terminal window:

```bash
cd frontend
npm install
npm start
```

The app will open at: http://localhost:3000

## Test the Application

### 1. Login as Employee

- Email: `john.doe@kambaa.in`
- Password: `employee123`
- You can create articles and see "Submit" and "My Articles" in navigation

### 2. Login as Admin

- Email: `admin@kambaa.in`
- Password: `admin123`
- You can see "Admin Dashboard" to approve/reject articles
- You CANNOT create articles (as per requirements)

### 3. Test Article Workflow

1. Login as employee
2. Click "Submit" → Create a new article
3. Submit the article (it goes to PENDING status)
4. Logout and login as admin
5. Go to Admin Dashboard
6. Approve or reject the article
7. Login back as employee to see the article status

## Troubleshooting

### Backend won't start

- **Check if MongoDB is running**: `Get-Service MongoDB`
- **Start MongoDB**: `Start-Service MongoDB` (as Administrator)
- **Verify connection string** in `.env`
- **Make sure port 5000 is not in use**

### Frontend won't start

- Make sure Node.js is installed
- Check if port 3000 is available
- Try `npm install` again

### MongoDB connection error

**Error:** `MongooseServerSelectionError`

**Solutions:**

- Check MongoDB service is running: `Get-Service MongoDB`
- Start the service: `Start-Service MongoDB` (as Administrator)
- Verify MONGODB_URI in `.env`
- Check if port 27017 is available
- For Atlas: Whitelist your IP address in MongoDB Atlas dashboard

### "Email must be @kambaa.in" error

- The system only accepts emails ending with @kambaa.in
- This is a requirement for the project

### Port already in use

```bash
# Find process using port 5000
netstat -ano | findstr :5000

# Kill the process (replace <PID> with actual process ID)
taskkill /PID <PID> /F
```

## Quick Commands Reference

```bash
# Backend
cd backend
npm install          # Install dependencies
npm run seed         # Reset and seed database
npm start            # Start server
npm run dev          # Start with auto-reload

# Frontend
cd frontend
npm install          # Install dependencies
npm start            # Start dev server

# Windows Quick Start
start-backend.bat    # Start backend
start-frontend.bat   # Start frontend
quick-start.bat      # Start both automatically
```

## MongoDB Management

### Using MongoDB Compass (GUI)

1. Open MongoDB Compass
2. Connect to: `mongodb://127.0.0.1:27017`
3. Browse database: `kkbp`
4. View collections: `users`, `articles`, `categories`, `tags`

### Using MongoDB Shell

```bash
# Connect to MongoDB
mongosh

# Switch to KKBP database
use kkbp

# View all collections
show collections

# Query users
db.users.find().pretty()

# Query articles
db.articles.find().pretty()

# Exit
exit
```

### Reset Database

To completely reset and reseed:

```bash
cd backend
npm run seed
```

This will drop all collections and recreate with fresh data.

## Default Data Created

### Categories

- Technology
- Development
- Design
- Best Practices
- Tutorials
- Documentation

### Users

- Admin: `admin@kambaa.in` / `admin123`
- Employee: `john.doe@kambaa.in` / `employee123`
- Employee: `jane.smith@kambaa.in` / `employee123`

## Project URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/
- MongoDB Compass: `mongodb://127.0.0.1:27017`

## Next Steps

1. ✅ Install MongoDB
2. ✅ Start MongoDB service
3. ✅ Configure backend
4. ✅ Seed database
5. ✅ Start backend
6. ✅ Start frontend
7. ✅ Login and test
8. 🎉 Start using the Knowledge Base!

---

## Need More Help?

### Additional Resources

- [MongoDB Documentation](https://docs.mongodb.com/)
- [MongoDB Compass Guide](https://docs.mongodb.com/compass/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [Main README](README.md) - Project overview and API documentation

### Common MongoDB Commands

```bash
# Check MongoDB status
Get-Service MongoDB

# Start MongoDB
Start-Service MongoDB

# Stop MongoDB
Stop-Service MongoDB

# Restart MongoDB
Restart-Service MongoDB
```

**Built with ❤️ by Kambaa Team**
