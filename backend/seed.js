const mongoose = require("mongoose");
const { connectDB } = require("./config/database");
const { User, Category, Article, Tag } = require("./models");

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
      {
        username: "sarah_wilson",
        email: "sarah.wilson@kambaa.in",
        password: "employee123",
        role: "EMPLOYEE",
      },
      {
        username: "mike_johnson",
        email: "mike.johnson@kambaa.in",
        password: "employee123",
        role: "EMPLOYEE",
      },
      {
        username: "emily_brown",
        email: "emily.brown@kambaa.in",
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

    // Get created data
    const admin = await User.findOne({ email: "admin@kambaa.in" });
    const johnDoe = await User.findOne({ email: "john.doe@kambaa.in" });
    const janeSmith = await User.findOne({ email: "jane.smith@kambaa.in" });
    const sarahWilson = await User.findOne({ email: "sarah.wilson@kambaa.in" });
    const mikeJohnson = await User.findOne({ email: "mike.johnson@kambaa.in" });
    const emilyBrown = await User.findOne({ email: "emily.brown@kambaa.in" });
    const techCategory = await Category.findOne({ name: "Technology" });
    const devCategory = await Category.findOne({ name: "Development" });
    const tutorialCategory = await Category.findOne({ name: "Tutorials" });
    const designCategory = await Category.findOne({ name: "Design" });
    const bestPracticesCategory = await Category.findOne({ name: "Best Practices" });

    // Create Tags
    const tags = await Tag.create([
      { name: "API" },
      { name: "Database" },
      { name: "Error" },
      { name: "Fix" },
      { name: "MongoDB" },
      { name: "Node.js" },
      { name: "React" },
      { name: "Performance" },
      { name: "Security" },
      { name: "Nginx" },
    ]);
    console.log("✅ Tags created");

    // Create sample approved articles
    const articles = await Article.create([
      // APPROVED ARTICLES
      {
        title: "How to Fix API Timeout Issues in Node.js",
        content: `# Solution

API timeouts often occur due to long-running database queries or external API calls. Here's how to fix them:

## Step 1: Increase Timeout Duration
\`\`\`javascript
app.use(timeout('30s'));
\`\`\`

## Step 2: Add Request Timeout Handler
\`\`\`javascript
app.use((req, res, next) => {
  if (!req.timedout) next();
});
\`\`\`

## Step 3: Optimize Database Queries
- Add proper indexes
- Use query projection to limit fields
- Implement pagination for large datasets

## Step 4: Use Async/Await Properly
Make sure all promises are properly awaited to avoid blocking.

**Result:** API response times reduced from 30s to 2s.`,
        excerpt: "Learn how to diagnose and fix API timeout issues in Node.js applications by optimizing queries and configuring proper timeout handlers.",
        status: "APPROVED",
        author: johnDoe._id,
        category: techCategory._id,
        tags: [tags[0]._id, tags[5]._id, tags[3]._id],
        approvedBy: admin._id,
        approvedAt: new Date(),
        views: 45,
      },
      {
        title: "MongoDB Connection Refused Error - Complete Fix",
        content: `# MongoDB Connection Refused Error

This error occurs when MongoDB service is not running or connection string is incorrect.

## Quick Fix:

### Windows:
\`\`\`powershell
# Check MongoDB service status
Get-Service MongoDB

# Start MongoDB service
Start-Service MongoDB
\`\`\`

### Linux/Mac:
\`\`\`bash
sudo systemctl start mongod
\`\`\`

## Verify Connection String:
\`\`\`
mongodb://127.0.0.1:27017/your_database
\`\`\`

## Common Issues:
1. **Port already in use** - Check if another process is using port 27017
2. **Firewall blocking** - Allow MongoDB through firewall
3. **Wrong URI** - Verify connection string format
4. **MongoDB not installed** - Install MongoDB Community Server

## Test Connection:
\`\`\`bash
mongosh
\`\`\`

If successful, you should see the MongoDB shell prompt.`,
        excerpt: "Step-by-step guide to resolve MongoDB connection refused errors on Windows, Linux, and Mac systems.",
        status: "APPROVED",
        author: janeSmith._id,
        category: devCategory._id,
        tags: [tags[1]._id, tags[2]._id, tags[4]._id, tags[3]._id],
        approvedBy: admin._id,
        approvedAt: new Date(),
        views: 78,
      },
      {
        title: "React Component Not Rendering - Debug Guide",
        content: `# React Component Not Rendering

Common reasons and solutions for React components not displaying.

## Common Issues:

### 1. Incorrect Import/Export
\`\`\`javascript
// Wrong
export default MyComponent;
import { MyComponent } from './MyComponent';

// Correct
export default MyComponent;
import MyComponent from './MyComponent';
\`\`\`

### 2. Missing Return Statement
\`\`\`javascript
// Wrong
const MyComponent = () => {
  <div>Content</div>
}

// Correct
const MyComponent = () => {
  return <div>Content</div>
}
\`\`\`

### 3. Conditional Rendering Issue
Make sure conditions are properly evaluated:
\`\`\`javascript
{data && data.length > 0 && (
  <Component data={data} />
)}
\`\`\`

### 4. Check React DevTools
Open React DevTools to see if component is in the tree.

### 5. CSS Display Issue
Component might be rendered but hidden:
\`\`\`css
/* Check for */
display: none;
opacity: 0;
visibility: hidden;
\`\`\`

### 6. Key Prop in Lists
Always provide unique keys:
\`\`\`javascript
{items.map(item => (
  <Component key={item.id} data={item} />
))}
\`\`\`

**Debug Steps:**
1. Check browser console for errors
2. Verify component is imported correctly
3. Add console.log to check if component is called
4. Inspect element to see if HTML exists`,
        excerpt: "Debug guide for React components that won't render, covering common issues and solutions.",
        status: "APPROVED",
        author: sarahWilson._id,
        category: devCategory._id,
        tags: [tags[6]._id, tags[2]._id, tags[3]._id],
        approvedBy: admin._id,
        approvedAt: new Date(),
        views: 63,
      },
      {
        title: "Nginx 502 Bad Gateway - Troubleshooting Guide",
        content: `# Fixing Nginx 502 Bad Gateway Error

A 502 error means Nginx cannot connect to your backend application.

## Solution Steps:

### 1. Check if Backend is Running
\`\`\`bash
# Check if Node.js app is running
pm2 list

# Or check port
netstat -tulpn | grep :3000
\`\`\`

### 2. Verify Nginx Configuration
\`\`\`nginx
upstream backend {
    server 127.0.0.1:3000;
}

server {
    location / {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
\`\`\`

### 3. Check Nginx Error Logs
\`\`\`bash
tail -f /var/log/nginx/error.log
\`\`\`

### 4. Increase Timeout Values
\`\`\`nginx
proxy_connect_timeout 600;
proxy_send_timeout 600;
proxy_read_timeout 600;
\`\`\`

### 5. Restart Services
\`\`\`bash
sudo systemctl restart nginx
pm2 restart app
\`\`\`

**Common Causes:**
- Backend application crashed
- Wrong port in proxy_pass
- SELinux blocking connections
- Backend taking too long to respond`,
        excerpt: "Complete guide to diagnose and fix Nginx 502 Bad Gateway errors with backend applications.",
        status: "APPROVED",
        author: johnDoe._id,
        category: tutorialCategory._id,
        tags: [tags[2]._id, tags[3]._id, tags[9]._id],
        approvedBy: admin._id,
        approvedAt: new Date(),
        views: 92,
      },
      {
        title: "MongoDB Authentication Failed - Security Fix",
        content: `# MongoDB Authentication Failed

How to properly configure MongoDB authentication and resolve auth errors.

## Solution:

### 1. Create Admin User
\`\`\`javascript
use admin
db.createUser({
  user: "admin",
  pwd: "securePassword123",
  roles: [ { role: "userAdminAnyDatabase", db: "admin" } ]
})
\`\`\`

### 2. Enable Authentication
Edit \`/etc/mongod.conf\`:
\`\`\`yaml
security:
  authorization: "enabled"
\`\`\`

### 3. Create Database User
\`\`\`javascript
use myDatabase
db.createUser({
  user: "appUser",
  pwd: "appPassword123",
  roles: [ { role: "readWrite", db: "myDatabase" } ]
})
\`\`\`

### 4. Update Connection String
\`\`\`
mongodb://appUser:appPassword123@localhost:27017/myDatabase?authSource=myDatabase
\`\`\`

### 5. Common Errors:

**Error: Authentication failed**
- Wrong username or password
- User doesn't exist in the specified database
- Wrong authSource in connection string

**Error: not authorized**
- User doesn't have required permissions
- Need to grant additional roles

### 6. Grant Roles
\`\`\`javascript
db.grantRolesToUser("appUser", [
  { role: "readWrite", db: "myDatabase" }
])
\`\`\`

**Security Best Practices:**
- Use strong passwords
- Create separate users for each application
- Grant minimum required permissions
- Regularly rotate credentials
- Use SSL/TLS for connections`,
        excerpt: "Complete guide to setting up MongoDB authentication and fixing authentication errors.",
        status: "APPROVED",
        author: mikeJohnson._id,
        category: techCategory._id,
        tags: [tags[4]._id, tags[8]._id, tags[3]._id],
        approvedBy: admin._id,
        approvedAt: new Date(),
        views: 55,
      },

      // PENDING ARTICLES (Waiting for Admin Approval)
      {
        title: "Understanding JWT Authentication in Express",
        content: `# JWT Authentication Implementation Guide

Learn how to implement secure JWT-based authentication in your Express application.

## What is JWT?

JSON Web Token (JWT) is a compact, URL-safe means of representing claims to be transferred between two parties.

## Implementation Steps:

### 1. Install Dependencies
\`\`\`bash
npm install jsonwebtoken bcryptjs
\`\`\`

### 2. Create Auth Middleware
\`\`\`javascript
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};
\`\`\`

### 3. Generate Tokens
\`\`\`javascript
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
  );
};
\`\`\`

### 4. Login Route
\`\`\`javascript
app.post('/api/auth/login', async (req, res) => {
  const { email, password } = req.body;
  
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  
  const token = generateToken(user._id);
  res.json({ token, user });
});
\`\`\`

## Security Best Practices:
- Use strong secret keys
- Set appropriate expiration times
- Store tokens securely on client side
- Implement refresh token mechanism
- Never store sensitive data in JWT payload`,
        excerpt: "Complete guide to implementing JWT authentication in Express.js applications with security best practices.",
        status: "PENDING",
        author: mikeJohnson._id,
        category: techCategory._id,
        tags: [tags[8]._id, tags[5]._id],
        views: 0,
      },
      {
        title: "CSS Flexbox Layout Best Practices",
        content: `# Mastering CSS Flexbox

Flexbox is a powerful layout tool that makes designing responsive layouts easier.

## Basic Flexbox Syntax

\`\`\`css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
\`\`\`

## Common Use Cases:

### 1. Centering Content
\`\`\`css
.center {
  display: flex;
  justify-content: center;
  align-items: center;
}
\`\`\`

### 2. Navigation Bar
\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 1rem;
}
\`\`\`

### 3. Card Layout
\`\`\`css
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  flex: 1 1 300px;
}
\`\`\`

### 4. Responsive Columns
\`\`\`css
.columns {
  display: flex;
  flex-direction: column;
}

@media (min-width: 768px) {
  .columns {
    flex-direction: row;
  }
}
\`\`\`

## Tips:
- Use gap property for spacing
- flex-grow, flex-shrink, flex-basis for responsive layouts
- align-items for vertical alignment
- justify-content for horizontal alignment`,
        excerpt: "Learn CSS Flexbox best practices for creating responsive and flexible layouts.",
        status: "PENDING",
        author: emilyBrown._id,
        category: designCategory._id,
        tags: [],
        views: 0,
      },
      {
        title: "Docker Compose for Development Environments",
        content: `# Docker Compose Development Setup

Streamline your development workflow with Docker Compose.

## What is Docker Compose?

Docker Compose is a tool for defining and running multi-container Docker applications.

## Example docker-compose.yml:

\`\`\`yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    volumes:
      - .:/app
      - /app/node_modules
    environment:
      - NODE_ENV=development
      - MONGODB_URI=mongodb://mongo:27017/mydb
    depends_on:
      - mongo
  
  mongo:
    image: mongo:6
    ports:
      - "27017:27017"
    volumes:
      - mongo-data:/data/db

volumes:
  mongo-data:
\`\`\`

## Commands:

\`\`\`bash
# Start all services
docker-compose up

# Start in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild containers
docker-compose up --build
\`\`\`

## Benefits:
- Consistent development environments
- Easy service orchestration
- Isolated dependencies
- Quick setup for new team members`,
        excerpt: "Set up efficient development environments using Docker Compose with this practical guide.",
        status: "PENDING",
        author: johnDoe._id,
        category: devCategory._id,
        tags: [tags[5]._id],
        views: 0,
      },
      {
        title: "Git Branching Strategies for Teams",
        content: `# Git Branching Best Practices

Effective branching strategies for team collaboration.

## Git Flow Model:

### Main Branches:
- **main** - Production-ready code
- **develop** - Integration branch for features

### Supporting Branches:
- **feature/** - New features
- **hotfix/** - Emergency production fixes
- **release/** - Release preparation

## Workflow:

### Creating a Feature Branch:
\`\`\`bash
git checkout develop
git pull origin develop
git checkout -b feature/user-authentication
\`\`\`

### Completing a Feature:
\`\`\`bash
git checkout develop
git merge --no-ff feature/user-authentication
git branch -d feature/user-authentication
git push origin develop
\`\`\`

### Hotfix Process:
\`\`\`bash
git checkout main
git checkout -b hotfix/critical-bug
# Make fixes
git checkout main
git merge --no-ff hotfix/critical-bug
git checkout develop
git merge --no-ff hotfix/critical-bug
git branch -d hotfix/critical-bug
\`\`\`

## Branch Naming Conventions:
- feature/short-description
- bugfix/issue-number
- hotfix/critical-issue
- release/version-number

## Best Practices:
- Keep branches short-lived
- Regular commits with clear messages
- Pull latest changes before creating branches
- Delete merged branches
- Use pull requests for code review`,
        excerpt: "Learn effective Git branching strategies for better team collaboration and code management.",
        status: "PENDING",
        author: janeSmith._id,
        category: bestPracticesCategory._id,
        tags: [],
        views: 0,
      },
      {
        title: "Python Virtual Environments Setup",
        content: `# Python Virtual Environments Guide

How to set up and manage Python virtual environments for project isolation.

## Why Virtual Environments?

Virtual environments allow you to manage dependencies per project without conflicts.

## Using venv:

### Create Virtual Environment:
\`\`\`bash
# Python 3
python -m venv myenv

# Activate on Windows
myenv\\Scripts\\activate

# Activate on Linux/Mac
source myenv/bin/activate
\`\`\`

### Install Packages:
\`\`\`bash
pip install package-name
\`\`\`

### Freeze Dependencies:
\`\`\`bash
pip freeze > requirements.txt
\`\`\`

### Install from Requirements:
\`\`\`bash
pip install -r requirements.txt
\`\`\`

## Using conda:

\`\`\`bash
# Create environment
conda create -n myenv python=3.9

# Activate
conda activate myenv

# Install packages
conda install numpy pandas

# Export environment
conda env export > environment.yml
\`\`\`

## Best Practices:
- One virtual environment per project
- Always activate before working
- Keep requirements.txt updated
- Add venv/ to .gitignore
- Document Python version requirements`,
        excerpt: "Complete guide to creating and managing Python virtual environments for project isolation.",
        status: "PENDING",
        author: sarahWilson._id,
        category: devCategory._id,
        tags: [],
        views: 0,
      },

      // REJECTED ARTICLES
      {
        title: "10 Ways to Code Faster",
        content: `Just use shortcuts and code every day. Practice makes perfect.

Here are some tips:
1. Use shortcuts
2. Code more
3. Learn your IDE
4. Use snippets
5. Type faster

That's it!`,
        excerpt: "Tips to improve coding speed.",
        status: "REJECTED",
        author: mikeJohnson._id,
        category: devCategory._id,
        tags: [],
        rejectionReason: "Content is too brief and lacks technical depth. Please provide detailed explanations, code examples, and actionable insights.",
        views: 0,
      },
      {
        title: "Best Programming Language 2026",
        content: `Python is the best programming language because everyone uses it. 

JavaScript is also good but Python is better.

You should learn Python first then JavaScript.

C++ is too hard don't use it.

Java is old.`,
        excerpt: "Comparison of programming languages.",
        status: "REJECTED",
        author: emilyBrown._id,
        category: techCategory._id,
        tags: [],
        rejectionReason: "Article contains subjective opinions without supporting evidence or data. Please provide objective comparisons with use cases, benchmarks, and specific examples.",
        views: 0,
      },
      {
        title: "How I Fixed My Computer",
        content: `My computer was not working so I restarted it and it worked.

Sometimes you just need to turn it off and on again.

If that doesn't work try restarting again.`,
        excerpt: "Computer troubleshooting.",
        status: "REJECTED",
        author: johnDoe._id,
        category: tutorialCategory._id,
        tags: [],
        rejectionReason: "Article does not meet knowledge base standards. Content is too generic and not relevant to our technical documentation needs.",
        views: 0,
      },
    ]);
    console.log("✅ Sample articles created");

    console.log("\n🎉 Database seeded successfully!\n");
    console.log("📝 Test Credentials:");
    console.log("Admin:");
    console.log("  Email: admin@kambaa.in");
    console.log("  Password: admin123");
    console.log("\nEmployees:");
    console.log("  Email: john.doe@kambaa.in | Password: employee123");
    console.log("  Email: jane.smith@kambaa.in | Password: employee123");
    console.log("  Email: sarah.wilson@kambaa.in | Password: employee123");
    console.log("  Email: mike.johnson@kambaa.in | Password: employee123");
    console.log("  Email: emily.brown@kambaa.in | Password: employee123");
    console.log("\n📊 Data Created:");
    console.log("  - 6 Users (1 Admin, 5 Employees)");
    console.log("  - 6 Categories");
    console.log("  - 10 Tags");
    console.log("  - 13 Total Articles:");
    console.log("    • 5 APPROVED (ready for chatbot)");
    console.log("    • 5 PENDING (waiting for admin approval)");
    console.log("    • 3 REJECTED (with rejection reasons)");
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
