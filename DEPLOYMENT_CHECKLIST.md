# 🚀 Deployment Checklist

## ✅ Pre-Deployment

### Code & Configuration
- [x] Test files removed (`test-gemini.js`, `check-models.js`)
- [x] Redundant documentation removed
- [x] `.env` file cleaned and configured
- [x] `.env.example` updated with current options
- [x] `.gitignore` configured properly
- [x] No sensitive data in repository

### Environment Setup
- [ ] MongoDB Atlas cluster created and configured
- [ ] Gemini API key obtained (optional) from https://aistudio.google.com/apikey
- [ ] Strong JWT_SECRET generated
- [ ] All environment variables documented

### Testing
- [ ] Backend starts without errors: `cd backend && node server.js`
- [ ] Frontend builds successfully: `cd frontend && npm run build`
- [ ] Database connection works
- [ ] Authentication flows tested
- [ ] RAG search working (if enabled)

---

## 🌐 Render Deployment

### Step 1: Prepare Repository
```bash
# Ensure all changes are committed
git add .
git commit -m "Production ready"
git push origin main
```

### Step 2: Connect to Render
1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New" → "Blueprint"
3. Connect GitHub repository
4. Render detects `render.yaml` automatically

### Step 3: Configure Environment Variables

**Backend Service:**
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/dbname
JWT_SECRET=<strong-random-string-min-32-chars>
EMBEDDING_PROVIDER=gemini
GEMINI_API_KEY=<your-gemini-api-key>
LLM_MODEL=gemini-pro
```

**Frontend Service:**
```
REACT_APP_API_URL=https://kkbp-backend.onrender.com/api
```

### Step 4: Deploy
- Click "Apply" to start deployment
- Wait 5-10 minutes for build
- Check logs for errors

### Step 5: Verify Deployment
- [ ] Backend health check: `https://your-backend.onrender.com/`
- [ ] Frontend loads: `https://your-frontend.onrender.com/`
- [ ] Login works
- [ ] Can create/view articles

---

## 🗄️ Database Setup

### MongoDB Atlas
1. Create free cluster at https://www.mongodb.com/cloud/atlas
2. Create database user
3. Whitelist IP: `0.0.0.0/0` (allow from anywhere)
4. Get connection string
5. Add to Render environment variables

### Seed Initial Data (Optional)
Using Render Shell or local connection:
```bash
node backend/seed.js
```

Default credentials created:
- Admin: admin@kambaa.in / admin123
- Employee: john.doe@kambaa.in / employee123

---

## 🔐 Post-Deployment Security

### Required Actions
- [ ] Login to application
- [ ] Change admin password immediately
- [ ] Change employee password immediately
- [ ] Verify only approved articles are visible
- [ ] Test role permissions (admin vs employee)

### Optional But Recommended
- [ ] Set up custom domain
- [ ] Enable Render auto-deploy on git push
- [ ] Set up monitoring/alerting
- [ ] Configure backup strategy
- [ ] Review and adjust rate limits

---

## 📊 RAG/AI Search Setup (Optional)

If using AI-powered search:

1. **Index Articles:**
   - Login as admin
   - Navigate to admin panel
   - Index all approved articles

2. **Test Search:**
   - Go to chatbot page
   - Ask a question
   - Verify relevant results
   - Check AI-generated answer (if using Gemini/OpenAI)

3. **Monitor Usage:**
   - Check API quotas
   - Monitor response times
   - Review search analytics

---

## 🧪 Testing Checklist

### Authentication
- [ ] Register new user
- [ ] Login with email/password
- [ ] Logout
- [ ] Protected routes work correctly

### Articles
- [ ] Create article as employee
- [ ] View pending articles as admin
- [ ] Approve/reject articles
- [ ] View approved articles
- [ ] Edit own articles
- [ ] Delete own articles
- [ ] Upload PDF attachment

### Search/Chatbot
- [ ] Search returns relevant results
- [ ] Similarity scores make sense
- [ ] Sources are linked correctly
- [ ] AI answers are relevant (if enabled)

### Admin Functions
- [ ] View dashboard statistics
- [ ] Manage users
- [ ] Manage categories
- [ ] View analytics
- [ ] Audit logs working

---

## 🔧 Troubleshooting

### Common Issues

**Backend not starting:**
```bash
# Check logs in Render dashboard
# Verify environment variables are set
# Ensure MongoDB URI is correct
```

**Frontend 404 errors:**
```bash
# Verify REACT_APP_API_URL is correct
# Check backend is running
# Verify routes in render.yaml
```

**Database connection failed:**
```bash
# Check MongoDB Atlas IP whitelist
# Verify connection string format
# Test connection locally first
```

**RAG search not working:**
```bash
# Ensure articles are indexed
# Check EMBEDDING_PROVIDER is set
# Verify API keys (if using Gemini/OpenAI)
# Check chatbot logs for errors
```

---

## 📝 Deployment URLs

After deployment, update these:

- **Backend API:** `https://kkbp-backend.onrender.com`
- **Frontend App:** `https://kkbp-frontend.onrender.com`
- **MongoDB:** `mongodb+srv://...`

---

## 🎉 You're Done!

Your Kambaa Knowledge Base Portal is now deployed and ready to use!

### Next Steps:
1. Share the URL with your team
2. Train users on how to submit articles
3. Monitor usage and feedback
4. Iterate and improve

For detailed documentation:
- [README.md](README.md) - Project overview
- [DEPLOYMENT.md](DEPLOYMENT.md) - Detailed deployment guide
- [RAG_SETUP.md](RAG_SETUP.md) - AI search configuration

---

**Need Help?** Check the logs first, then review the documentation.
