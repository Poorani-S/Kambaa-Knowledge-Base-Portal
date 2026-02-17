# 🚀 GO LIVE - DEPLOYMENT INSTRUCTIONS

## ✅ Code is Ready!
Your code has been pushed to GitHub:
**https://github.com/Poorani-S/Kambaa-Knowledge-Base-Portal**

---

## 📋 DEPLOYMENT STEPS

### **Option 1: Render (Recommended - FREE)**

#### Step 1: Sign Up for Render
1. Go to: https://dashboard.render.com/register
2. Sign up with GitHub
3. Authorize Render to access your repositories

#### Step 2: Deploy Using Blueprint
1. Click **"New"** → **"Blueprint"**
2. Select repository: `Poorani-S/Kambaa-Knowledge-Base-Portal`
3. Render will detect the `render.yaml` file automatically

#### Step 3: Set Environment Variables

**For Backend Service:**
```
NODE_ENV=production
MONGODB_URI=mongodb+srv://admin:kalai12345@cluster.49g8whd.mongodb.net/?appName=Cluster
JWT_SECRET=kambaa-knowledge-base-super-secret-key-2026-production
EMBEDDING_PROVIDER=gemini
GEMINI_API_KEY=AIzaSyDD_F7B_BNyj_qRy0yyXNVb2FBG8mGl2tQ
LLM_MODEL=gemini-pro
```

**For Frontend Service:**
```
REACT_APP_API_URL=https://kkbp-backend.onrender.com/api
```
*(Replace with your actual backend URL after deployment)*

#### Step 4: Click "Apply"
- Deployment will start automatically
- Wait 5-10 minutes for build to complete
- Check logs for any errors

#### Step 5: Update Frontend API URL
Once backend is deployed:
1. Note the backend URL (e.g., `https://kkbp-backend-abc123.onrender.com`)
2. Update Frontend environment variable: `REACT_APP_API_URL=https://your-backend-url.onrender.com/api`
3. Redeploy frontend

---

### **Option 2: Vercel (Frontend) + Render (Backend)**

#### Backend on Render:
Same as Option 1 above

#### Frontend on Vercel:
1. Go to: https://vercel.com
2. Import your GitHub repo
3. Set root directory: `frontend`
4. Add environment variable:
   ```
   REACT_APP_API_URL=https://your-backend-url.onrender.com/api
   ```
5. Deploy

---

## 🗄️ DATABASE SETUP (Already Done!)

Your MongoDB Atlas is already configured:
- **Connection:** mongodb+srv://admin:kalai12345@cluster.49g8whd.mongodb.net/
- **Users:** 6 users (1 admin + 5 employees)
- **Articles:** 13 articles (5 approved, 5 pending, 3 rejected)
- **Indexed:** 5 approved articles ready for chatbot

---

## 🔐 POST-DEPLOYMENT TASKS

### 1. Test the Deployment
- [ ] Visit your frontend URL
- [ ] Login with: `admin@kambaa.in` / `admin123`
- [ ] Test article creation
- [ ] Test chatbot search
- [ ] Test admin dashboard

### 2. Security (Important!)
- [ ] Change admin password
- [ ] Add SSL certificate (Render provides free SSL)
- [ ] Review user permissions

### 3. Optional Enhancements
- [ ] Add custom domain
- [ ] Set up email notifications
- [ ] Configure backups
- [ ] Add monitoring

---

## 📞 DEFAULT LOGIN CREDENTIALS

**Admin:**
- Email: `admin@kambaa.in`
- Password: `admin123`

**Employees:**
- `john.doe@kambaa.in` / `employee123`
- `jane.smith@kambaa.in` / `employee123`
- `sarah.wilson@kambaa.in` / `employee123`
- `mike.johnson@kambaa.in` / `employee123`
- `emily.brown@kambaa.in` / `employee123`

⚠️ **Change these passwords immediately after deployment!**

---

## 🎯 QUICK START WITH RENDER

### Fastest Way to Deploy:

1. **Visit:** https://dashboard.render.com
2. **Sign in** with GitHub
3. **New → Blueprint**
4. **Select your repo**
5. **Add environment variables** (copy from above)
6. **Click Apply**
7. **Wait 10 minutes**
8. **Done!** ✅

Your app will be live at:
- Backend: `https://kkbp-backend-xxxxx.onrender.com`
- Frontend: `https://kkbp-frontend-xxxxx.onrender.com`

---

## 📊 FEATURES INCLUDED

✅ User authentication (Admin & Employee roles)
✅ Article submission and approval workflow
✅ Admin dashboard with statistics
✅ AI-powered chatbot (RAG search with Gemini)
✅ PDF upload support
✅ Category and tag management
✅ Audit logging
✅ Responsive design

---

## 🆘 TROUBLESHOOTING

### Frontend can't connect to backend
- Check `REACT_APP_API_URL` in frontend environment variables
- Make sure backend URL is correct
- Check CORS settings in backend

### Database connection failed
- Verify MongoDB Atlas connection string
- Check network access in MongoDB Atlas (should allow 0.0.0.0/0)
- Verify database user credentials

### Chatbot not working
1. Login to admin dashboard
2. Click "Index All Articles"
3. Wait for indexing to complete
4. Try chatbot again

---

## 📖 DOCUMENTATION

- Full deployment guide: `DEPLOYMENT.md`
- Detailed checklist: `DEPLOYMENT_CHECKLIST.md`
- RAG setup: `RAG_SETUP.md`
- README: `README.md`

---

## ✨ YOU'RE READY TO GO LIVE!

Your code is on GitHub and ready for deployment. Follow the steps above to deploy on Render (recommended) or any other platform.

**Good luck with your launch! 🎉**
