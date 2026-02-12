# Kambaa Knowledge Base Portal - Deployment Guide

## 🚀 Render Deployment (Recommended)

### Automatic Deployment with render.yaml

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Connect to Render**
   - Go to [Render Dashboard](https://dashboard.render.com)
   - Click "New" → "Blueprint"
   - Connect your GitHub repository
   - Render will auto-detect `render.yaml`

3. **Set Environment Variables**
   
   **Backend Service:**
   ```
   NODE_ENV=production
   MONGODB_URI=<your-mongodb-atlas-url>
   JWT_SECRET=<generate-strong-secret>
   EMBEDDING_PROVIDER=gemini
   GEMINI_API_KEY=<your-gemini-key>
   LLM_MODEL=gemini-pro
   ```

   **Frontend Service:**
   ```
   REACT_APP_API_URL=https://your-backend-name.onrender.com/api
   ```

4. **Deploy**
   - Click "Apply" to start deployment
   - Wait for build to complete (~5-10 minutes)

### MongoDB Atlas Setup

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create free cluster
3. Add database user
4. Whitelist IP: `0.0.0.0/0` (allow from anywhere)
5. Get connection string
6. Update `MONGODB_URI` in Render

### Post-Deployment

1. **Seed initial data:**
   - Use Render Shell or local connection
   - Run: `node backend/seed.js`

2. **Test endpoints:**
   - Health: `https://your-backend.onrender.com/`
   - Login: `https://your-backend.onrender.com/api/auth/login`

3. **Access frontend:**
   - `https://your-frontend.onrender.com`

---

## 🖥️ VPS/Server Deployment

### Prerequisites
- Ubuntu 20.04+ or similar
- Node.js 18+
- MongoDB
- nginx
- PM2

### Quick Setup

```bash
# 1. Install dependencies
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs mongodb nginx
sudo npm install -g pm2

# 2. Clone and setup
git clone <your-repo-url>
cd Kambaa-Knowledge-Base-Portal

# 3. Backend
cd backend
npm install --production
cp .env.example .env
# Edit .env with production values
nano .env

# 4. Frontend
cd ../frontend
npm install
npm run build

# 5. Start with PM2
cd ..
pm2 start ecosystem.config.js
pm2 save
pm2 startup

# 6. Configure nginx (see nginx config below)
```

### nginx Configuration

```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        root /path/to/Kambaa-Knowledge-Base-Portal/frontend/build;
        try_files $uri /index.html;
    }

    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

---

## 📋 Environment Variables

### Backend
```env
NODE_ENV=production
MONGODB_URI=mongodb://localhost:27017/kkbp_production
JWT_SECRET=<generate-strong-random-string>
JWT_EXPIRE=7d
EMBEDDING_PROVIDER=gemini
GEMINI_API_KEY=<your-api-key>
LLM_MODEL=gemini-pro
```

### Frontend
```env
REACT_APP_API_URL=https://your-domain.com/api
```

---

## 🔐 Security

**Default Admin Credentials:**
- Email: `admin@kambaa.in`
- Password: `admin123`

⚠️ **Change immediately after first login!**

**Production Checklist:**
- [ ] Change admin password
- [ ] Set strong JWT_SECRET
- [ ] Enable MongoDB authentication
- [ ] Configure firewall
- [ ] Enable HTTPS (use Certbot for Let's Encrypt)
- [ ] Set up backups

---

## 🔧 Management Commands

```bash
# PM2
pm2 status              # Check status
pm2 logs kkbp-backend   # View logs
pm2 restart kkbp-backend # Restart
pm2 monit              # Monitor

# Updates
git pull origin main
cd backend && npm install --production
cd ../frontend && npm install && npm run build
pm2 restart kkbp-backend

# Backup MongoDB
mongodump --db=kkbp_production --out=/backup/$(date +%Y%m%d)
```

---

## 🆘 Troubleshooting

**Backend not starting:**
- Check MongoDB: `systemctl status mongodb`
- Check logs: `pm2 logs kkbp-backend`
- Verify .env file

**404 on API calls:**
- Check Render environment variables
- Verify REACT_APP_API_URL in frontend
- Check backend logs for startup errors

**Database connection failed:**
- Verify MONGODB_URI format
- Check MongoDB Atlas whitelist (0.0.0.0/0)
- Test connection string locally

---

For more help, check the logs and ensure all environment variables are set correctly.

For issues or questions, refer to application logs and verify all services are running correctly.
