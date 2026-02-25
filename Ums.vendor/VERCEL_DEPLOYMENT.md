# UMS Vendor Tracker - Deployment Guide

## Quick Deployment to Vercel

### Prerequisites
- Vercel account (free at https://vercel.com)
- GitHub, GitLab, or Bitbucket account
- Git installed locally

### Option 1: Deploy from CLI (Fastest)

```bash
# 1. Install Vercel CLI globally
npm i -g vercel

# 2. Login to Vercel
vercel login

# 3. Deploy from project directory
vercel
```

### Option 2: Deploy from GitHub UI (Recommended)

1. **Push your code to GitHub**
   ```bash
   git push -u origin main
   ```

2. **Go to https://vercel.com/dashboard**

3. **Click "Add New... → Project"**

4. **Import your GitHub repository** (`ums-vendor-tracker`)

5. **Configure Project Settings:**
   - Framework: Other/Static Site
   - Build Command: (leave empty)
   - Output Directory: (leave empty)

6. **Deploy** – Click "Deploy"

### Option 3: Connect GitHub Repository UI

1. Go to **https://vercel.com/new**
2. Select **Import Git Repository**
3. Paste GitHub URL: `https://github.com/YOUR_USERNAME/ums-vendor-tracker.git`
4. Click **Continue**
5. Click **Deploy**

## After Deployment

Your app will be live at: `https://ums-vendor-tracker.vercel.app` (or custom domain)

### Custom Domain (Optional)
In Vercel Dashboard → Project Settings → Domains → Add custom domain

### Environment Variables (if needed later)
Settings → Environment Variables → Add your secrets

## Vercel Features Enabled

✅ **PWA Support** – Service worker (`sw.js`) & manifest work seamlessly  
✅ **CORS** – Headers configured for security  
✅ **Caching** – Service worker + manifest optimized  
✅ **Automatic HTTPS** – All traffic encrypted  
✅ **CDN** – Global edge network  

## Troubleshooting

**Issue:** App shows 404 or blank page  
**Fix:** Verify `vercel.json` rewrites exist and `ums-vendor.html` is in root

**Issue:** Service worker not registering  
**Fix:** Check browser console; ensure `sw.js` is in root and `Cache-Control` headers allow it

**Issue:** Changes not reflected after push  
**Fix:** Vercel auto-redeploys on push; check deployment status in dashboard
