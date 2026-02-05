# MySQL Setup Guide for KKBP

## Issue: "CREATE : The term 'CREATE' is not recognized"

This error occurs because you're trying to run SQL commands directly in PowerShell. SQL commands need to be run inside MySQL.

## Solution Options:

### Option 1: Use MySQL Command Line (Recommended)

1. **Open MySQL Command Line Client** (not PowerShell)
   - Find it in Start Menu → MySQL → MySQL Command Line Client
   - OR run: `mysql -u root -p` in PowerShell (if MySQL is in PATH)

2. **Enter your MySQL password** when prompted

3. **Run these commands:**

   ```sql
   CREATE DATABASE kkbp_db;
   exit;
   ```

4. **Then run the seed script:**
   ```bash
   cd backend
   npm run seed
   ```

### Option 2: Use the Setup Script (Easiest)

Just double-click: **`setup-database.bat`** in the KKBP folder

This will:

- Create the database
- Seed with initial data
- Show you the test credentials

### Option 3: Let Sequelize Create Everything

If MySQL is running, you can skip manual database creation:

1. Make sure MySQL service is running
2. Update `backend/.env` with your MySQL password
3. Run: `npm run seed` - Sequelize will create the database and tables

## Check if MySQL is Running

### Method 1: Services

```powershell
Get-Service | Where-Object {$_.Name -like "*mysql*"}
```

### Method 2: Task Manager

- Open Task Manager (Ctrl+Shift+Esc)
- Go to Services tab
- Look for "MySQL" or "MySQL80"
- Status should be "Running"

## Start MySQL Service

### Option A: PowerShell (Run as Administrator)

```powershell
Start-Service MySQL80
# or
Start-Service MySQL
```

### Option B: Services GUI

1. Press `Win + R`
2. Type `services.msc`
3. Find "MySQL" or "MySQL80"
4. Right-click → Start

## If MySQL is Not Installed

Download and install from: https://dev.mysql.com/downloads/mysql/

During installation:

- Choose "Developer Default"
- Set root password (remember it!)
- Keep default port (3306)

## Update Database Password

If your MySQL has a password, update `backend/.env`:

```env
DB_PASSWORD=your_actual_password
```

## Test Connection

```powershell
cd backend
node -e "require('./config/database').testConnection()"
```

## Quick Start Without Database Setup

If you just want to run the app and MySQL is already running:

Double-click: **`quick-start.bat`**

This will:

1. Start backend (creates tables automatically)
2. Start frontend
3. Open both servers

## Common Issues

### Issue: "Access Denied for user 'root'"

**Solution:** Wrong password in `.env` file

### Issue: "ECONNREFUSED"

**Solution:** MySQL is not running. Start the service.

### Issue: "Unknown database 'kkbp_db'"

**Solution:** Run `setup-database.bat` or create database manually

### Issue: Port 3306 already in use

**Solution:** Another MySQL instance is running. Stop it or change port.

## After Setup

Once database is ready:

1. **Start Backend:**

   ```bash
   cd backend
   npm start
   ```

2. **Start Frontend:** (in new terminal)

   ```bash
   cd frontend
   npm start
   ```

3. **Login with:**
   - Admin: `admin@kambaa.in` / `admin123`
   - Employee: `john.doe@kambaa.in` / `employee123`

## Need Help?

If you're still having issues:

1. Check if MySQL service is running
2. Verify password in `backend/.env`
3. Try running `setup-database.bat`
4. Check MySQL logs for errors
