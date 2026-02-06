# KKBP Setup Guide

> Version 1.0.0 | Last Updated: February 6, 2026

## Complete Setup Instructions

### Step 1: Install MySQL (if not already installed)

**Recommended Version:** MySQL 8.0 or higher

1. Download MySQL Community Server from: https://dev.mysql.com/downloads/mysql/
2. Install and remember your root password
3. Start MySQL service
4. Verify installation: `mysql --version`

### Step 2: Create Database

Open MySQL command line or MySQL Workbench and run:

```sql
CREATE DATABASE kkbp_db;
```

Or use the provided SQL script:

```bash
mysql -u root -p < backend/database/setup.sql
```

### Step 3: Configure Backend

1. Navigate to backend folder:

```bash
cd backend
```

2. The `.env` file is already created. Update it if needed:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD  # Update this!
DB_NAME=kkbp_db
```

3. Install dependencies (already done):

```bash
npm install
```

4. Seed the database (creates tables and sample data):

```bash
npm run seed
```

Expected output:

```
🌱 Seeding database...
✅ Database synced
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
✅ Database connection established successfully
✅ Database synchronized
🚀 Server running on port 5000
📝 Environment: development
```

### Step 5: Start Frontend

Open a NEW terminal window:

```bash
cd frontend
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

- Check if MySQL is running
- Verify database credentials in `.env`
- Make sure port 5000 is not in use

### Frontend won't start

- Make sure Node.js is installed
- Check if port 3000 is available
- Try `npm install` again

### Database connection error

- Check MySQL service is running
- Verify DB_USER and DB_PASSWORD in `.env`
- Ensure database `kkbp_db` exists

### "Email must be @kambaa.in" error

- The system only accepts emails ending with @kambaa.in
- This is a requirement for the project

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
```

## Default Categories Created

- Technology
- Development
- Design
- Best Practices
- Tutorials
- Documentation

## Project URLs

- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health Check: http://localhost:5000/

## Next Steps

1. ✅ Create database
2. ✅ Seed data
3. ✅ Start backend
4. ✅ Start frontend
5. ✅ Login and test
6. 🎉 Start using the Knowledge Base!

---

## Need More Help?

Refer to:

- [MySQL Setup Guide](MYSQL_SETUP.md) - Detailed MySQL troubleshooting
- [Main README](README.md) - Project overview and API documentation

**Built with ❤️ by Kambaa Team**
