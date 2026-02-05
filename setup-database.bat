@echo off
echo ======================================
echo KKBP Database Setup
echo ======================================
echo.

echo Checking MySQL connection...
echo.

REM Try to connect to MySQL and create database
mysql -u root -p -e "CREATE DATABASE IF NOT EXISTS kkbp_db; USE kkbp_db; SELECT 'Database created successfully!' AS Status;"

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ======================================
    echo ERROR: Could not connect to MySQL
    echo ======================================
    echo.
    echo Please make sure:
    echo 1. MySQL is installed
    echo 2. MySQL service is running
    echo 3. You have the correct root password
    echo.
    echo To start MySQL service:
    echo - Open Services (services.msc)
    echo - Find "MySQL" or "MySQL80"
    echo - Right-click and select "Start"
    echo.
    echo OR install MySQL from: https://dev.mysql.com/downloads/mysql/
    echo.
    pause
    exit /b 1
)

echo.
echo ======================================
echo Database created successfully!
echo ======================================
echo.
echo Now seeding the database with initial data...
echo.

cd backend
call npm run seed

echo.
echo ======================================
echo Setup Complete!
echo ======================================
echo.
echo Test Credentials:
echo Admin: admin@kambaa.in / admin123
echo Employee: john.doe@kambaa.in / employee123
echo.
pause
