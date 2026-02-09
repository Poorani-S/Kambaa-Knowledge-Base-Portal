# Kambaa Knowledge Base Portal - Deployment Guide

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (v6 or higher)
- PM2 (for production process management)
- nginx (for reverse proxy)

## Production Deployment Steps

### 1. Server Setup

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt install -y nodejs

# Install MongoDB
sudo apt install -y mongodb

# Install PM2 globally
sudo npm install -g pm2

# Install nginx
sudo apt install -y nginx
```

### 2. Application Setup

```bash
# Clone repository
git clone <your-repo-url>
cd Kambaa-Knowledge-Base-Portal

# Install backend dependencies
cd backend
npm install --production
cd ..

# Install frontend dependencies and build
cd frontend
npm install
npm run build
cd ..
```

### 3. Environment Configuration

**Backend Configuration:**

```bash
# Create backend .env file
cd backend
cp .env.example .env

# Edit .env with production values
nano .env
```

Update these critical values:
- `NODE_ENV=production`
- `MONGODB_URI=mongodb://127.0.0.1:27017/kkbp_production`
- `JWT_SECRET=<generate-strong-secret>`

**Frontend Configuration:**

```bash
# Create frontend .env file
cd frontend
cp .env.example .env

# Edit .env with production API URL
nano .env
```

Update for production:
- `REACT_APP_API_URL=https://your-domain.com/api` (or use nginx proxy)

### 4. Database Setup

```bash
# Start MongoDB
sudo systemctl start mongodb
sudo systemctl enable mongodb

# Seed initial data (optional)
cd backend
node seed.js
cd ..
```

### 5. Start Application with PM2

```bash
# Start backend using PM2
pm2 start ecosystem.config.js

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

### 6. nginx Configuration

Create nginx configuration file:

```bash
sudo nano /etc/nginx/sites-available/kkbp
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name your-domain.com;

    # Frontend - Serve React build
    location / {
        root /path/to/Kambaa-Knowledge-Base-Portal/frontend/build;
        try_files $uri /index.html;
        
        # Security headers
        add_header X-Frame-Options "SAMEORIGIN" always;
        add_header X-Content-Type-Options "nosniff" always;
        add_header X-XSS-Protection "1; mode=block" always;
    }

    # Backend API
    location /api {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Static files caching
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        root /path/to/Kambaa-Knowledge-Base-Portal/frontend/build;
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

Enable the site:

```bash
sudo ln -s /etc/nginx/sites-available/kkbp /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 7. SSL Certificate (Optional but Recommended)

```bash
# Install Certbot
sudo apt install -y certbot python3-certbot-nginx

# Obtain SSL certificate
sudo certbot --nginx -d your-domain.com
```

## Production Management Commands

```bash
# View logs
pm2 logs kkbp-backend

# Restart application
pm2 restart kkbp-backend

# Stop application
pm2 stop kkbp-backend

# Monitor application
pm2 monit

# View status
pm2 status
```

## Environment Variables Reference

### Backend (backend/.env)

| Variable | Description | Example |
|----------|-------------|---------|
| PORT | Backend server port | 5000 |
| NODE_ENV | Environment mode | production |
| MONGODB_URI | MongoDB connection string | mongodb://localhost:27017/kkbp |
| JWT_SECRET | Secret key for JWT tokens | <strong-random-string> |
| JWT_EXPIRE | JWT token expiration | 7d |

### Frontend (frontend/.env)

| Variable | Description | Example |
|----------|-------------|---------|
| REACT_APP_API_URL | Backend API endpoint | http://localhost:5000/api |

**Note:** In production with nginx reverse proxy, you can omit `REACT_APP_API_URL` and let nginx handle API routing.

## Default Credentials

**Admin User:**
- Email: admin@kambaa.in
- Password: admin123

**Important:** Change admin password immediately after first login!

## Frontend Build

The frontend build is pre-configured to proxy API requests. In production with nginx, this is handled by the reverse proxy configuration.

```bash
cd frontend
npm run build
```

Build output: `frontend/build/`

## Security Checklist

- [ ] Change default admin password
- [ ] Generate strong JWT_SECRET
- [ ] Enable MongoDB authentication
- [ ] Configure firewall (UFW)
- [ ] Enable HTTPS/SSL
- [ ] Set up regular backups
- [ ] Configure CORS appropriately
- [ ] Enable rate limiting
- [ ] Set up monitoring and alerting

## Backup Strategy

```bash
# Backup MongoDB
mongodump --db=kkbp_production --out=/backup/mongodb/$(date +%Y%m%d)

# Backup configuration
tar -czf /backup/config-$(date +%Y%m%d).tar.gz backend/.env ecosystem.config.js
```

## Monitoring

```bash
# Check application status
pm2 status

# Check nginx status
sudo systemctl status nginx

# Check MongoDB status
sudo systemctl status mongodb

# View application logs
pm2 logs kkbp-backend --lines 100
```

## Troubleshooting

**Backend not starting:**
- Check MongoDB is running: `sudo systemctl status mongodb`
- Verify .env configuration
- Check logs: `pm2 logs kkbp-backend`

**Frontend not loading:**
- Verify nginx configuration: `sudo nginx -t`
- Check nginx logs: `sudo tail -f /var/log/nginx/error.log`
- Ensure build exists: `ls frontend/build`

**Database connection issues:**
- Verify MongoDB URI in .env
- Check MongoDB is accessible: `mongo --eval 'db.runCommand({ connectionStatus: 1 })'`

## Performance Optimization

1. **Enable gzip in nginx** (add to nginx config):
```nginx
gzip on;
gzip_vary on;
gzip_min_length 1024;
gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/javascript application/xml+rss application/json;
```

2. **MongoDB indexing** - Indexes are already configured in models

3. **PM2 Cluster Mode** (for multiple CPU cores):
```javascript
// In ecosystem.config.js, change:
instances: 'max', // Use all available CPUs
exec_mode: 'cluster'
```

## Updates and Maintenance

```bash
# Pull latest changes
git pull origin main

# Update dependencies
cd backend && npm install --production
cd ../frontend && npm install && npm run build

# Restart application
pm2 restart kkbp-backend

# Reload nginx
sudo systemctl reload nginx
```

## Support

For issues or questions, refer to application logs and verify all services are running correctly.
