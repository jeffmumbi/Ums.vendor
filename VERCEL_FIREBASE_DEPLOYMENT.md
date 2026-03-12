# Deploying UMS Vendor Tracker with Firebase to Vercel

## Overview

This guide explains how to deploy your UMS Vendor Tracker application to **Vercel** with **Firebase** backend integration.

## Pre-Deployment Checklist

- [ ] Firebase project is set up with correct credentials
- [ ] `firebase-config.js` has been updated with your Firebase config
- [ ] All three Firebase services enabled: Firestore, Auth, Storage
- [ ] Security rules have been published in Firestore and Storage
- [ ] Application tested locally and working with Firebase
- [ ] All files in `Ums.vendor/` folder

## Files to Deploy

Make sure these files are in your `Ums.vendor/` directory:

```
Ums.vendor/
├── ums-vendor.html              (Main application)
├── firebase-config.js            (Firebase credentials)
├── firebase-integration.js       (Firebase bridge)
├── manifest.json                 (PWA manifest)
├── sw.js                        (Service Worker)
├── vercel.json                  (Vercel config)
└── package.json                 (Optional - if using Node.js)
```

## Deploy to Vercel

### Option 1: Vercel Web Interface (Recommended)

**Step 1: Prepare Your Repository**
```bash
# Clone or create GitHub repository
git init
git add .
git commit -m "Initial UMS Vendor Tracker with Firebase"
```

**Step 2: Push to GitHub**
```bash
git remote add origin https://github.com/YOUR_USERNAME/vendor-tracker.git
git branch -M main
git push -u origin main
```

**Step 3: Connect to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Sign up or log in with GitHub
3. Click **"New Project"**
4. Select your GitHub repository
5. Configure project:
   - **Project name**: `ums-vendor-tracker`
   - **Root directory**: `Ums.vendor` (or leave blank if files are in root)
   - **Build command**: Leave empty (static site)
   - **Output directory**: Leave empty
6. Click **"Deploy"**

### Option 2: Vercel CLI

**Step 1: Install Vercel CLI**
```bash
npm install -g vercel
```

**Step 2: Deploy**
```bash
cd Ums.vendor
vercel
```

**Step 3: Follow prompts**
- Confirm project details
- Select scope
- Confirm deployment

### Option 3: GitHub Integration

1. Push code to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Click **"Import Project"**
4. Paste your GitHub repository URL
5. Click **"Continue"**
6. Configure and deploy

## Vercel Configuration

### Create `vercel.json`

Place this in your `Ums.vendor/` directory:

```json
{
  "buildCommand": "",
  "outputDirectory": ".",
  "public": ".",
  "env": {
    "NODE_ENV": "production"
  },
  "headers": [
    {
      "source": "/(.+)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "max-age=3600"
        }
      ]
    },
    {
      "source": "/firebase-config.js",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "max-age=86400"
        }
      ]
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/ums-vendor.html"
    }
  ]
}
```

This configuration:
- Serves static files
- Enables caching
- Routes all requests to your HTML file (for PWA/SPA behavior)

## Environment Variables

If you want to use environment variables for extra security:

1. In Vercel dashboard, go to **Settings** → **Environment Variables**
2. Add your Firebase config as variables:
   ```
   VITE_FIREBASE_API_KEY=YOUR_API_KEY
   VITE_FIREBASE_AUTH_DOMAIN=YOUR_AUTH_DOMAIN
   VITE_FIREBASE_PROJECT_ID=YOUR_PROJECT_ID
   VITE_FIREBASE_STORAGE_BUCKET=YOUR_STORAGE_BUCKET
   VITE_FIREBASE_MESSAGING_SENDER_ID=YOUR_SENDER_ID
   VITE_FIREBASE_APP_ID=YOUR_APP_ID
   ```

3. Update `firebase-config.js` to read from environment:
   ```javascript
   const firebaseConfig = {
       apiKey: process.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
       authDomain: process.env.VITE_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
       // ... etc
   };
   ```

## Custom Domain Setup

1. In Vercel dashboard, go to **Settings** → **Domains**
2. Click **"Add"**
3. Enter your domain (e.g., `vendor-tracker.yourdomain.com`)
4. Follow DNS configuration instructions
5. Vercel handles SSL/HTTPS automatically

## Firebase CORS Configuration

If you get CORS errors with Firebase:

1. Go to Firebase Console → Project Settings
2. Find **"Authorized JavaScript origins"**
3. Add your Vercel domain:
   ```
   https://your-project.vercel.app
   https://vendor-tracker.yourdomain.com
   ```
4. Save

## Testing Deployment

### Test Live URL
1. After deployment, Vercel gives you a URL like `https://ums-vendor-tracker.vercel.app`
2. Open it in browser
3. Check console (F12) for Firebase connection messages

### Verify Firebase Connection
```javascript
// Open browser console and run:
FirebaseDataBridge_Instance.getStatus()
```

Expected output:
```javascript
{
  usingFirebase: true,
  isSyncing: false,
  queueLength: 0
}
```

### Test Functionality
- [ ] Login works
- [ ] Can create issues
- [ ] Can add passwords
- [ ] Notifications work
- [ ] Can upload documents
- [ ] Exports work (PDF/Excel)

## Performance Optimization

### Enable Caching
The `vercel.json` configuration enables caching. Verify:
1. Go to Vercel dashboard → Deployments
2. Click latest deployment → **Runtime logs**
3. Check cache headers are being sent

### Optimize Images
- Use optimized logo
- Compress screenshots
- Use WebP format where possible

### Enable Gzip Compression
Vercel automatically enables this for you.

### Monitor Performance
1. Go to Vercel dashboard → Analytics (if enabled)
2. Check Web Vitals:
   - First Contentful Paint (FCP)
   - Largest Contentful Paint (LCP)
   - Cumulative Layout Shift (CLS)

## Monitoring & Logging

### Vercel Logs
```bash
# View deployment logs
vercel logs

# View with streaming
vercel logs --follow
```

### Firebase Logs
1. Firebase Console → Firestore Database → Logs
2. Monitor for errors and quota usage

### Browser Console
Your app logs Firebase operations to console:
```
✅ Firebase initialized successfully
✅ Firebase bridge initialized - Using cloud storage
```

## Troubleshooting Deployment

### Issue: Blank Page
**Solution**: Check browser console for errors. Likely Firebase SDK loading issue.

### Issue: Firebase SDK Not Found
**Solution**: Verify Firebase script tags are in HTML head.

### Issue: "Cannot GET /"
**Solution**: Ensure `vercel.json` routes are configured correctly.

### Issue: API Key Exposed
**Solution**: Firebase API keys are meant to be public (they're restricted by Firestore rules). Your data is protected by security rules, not the key.

### Issue: CORS Errors
**Solution**: Add your domain to Firebase Authorized JavaScript Origins.

## Rollback Deployment

If deployment has issues:

1. Go to Vercel dashboard → Deployments
2. Find working deployment in history
3. Click it → **...** → **Promote to Production**

## Database Backups

### Automatic Backups
Firestore automatically backs up your data. To view:
1. Firebase Console → Firestore Database
2. Look for **"Scheduled backups"** section

### Manual Backup
Export data from Firestore:
```bash
# Using Firebase CLI
firebase firestore:export backup/
```

## Security Checklist

- [ ] Firebase credentials in `firebase-config.js` are correct
- [ ] Firestore Security Rules restrict to authenticated users
- [ ] Storage Security Rules restrict to authenticated users
- [ ] Authentication (Email/Password) is enabled in Firebase
- [ ] Domain is added to Firebase CORS whitelist
- [ ] HTTPS is enabled (Vercel does this automatically)
- [ ] Environment variables are set (if using them)

## Post-Deployment

### Create Admin User
1. Open your deployed app
2. Sign up with admin credentials:
   - Email: `admin@yourcompany.com`
   - Password: Strong password
3. In Firebase Console → Authentication → Set admin role in Firestore `users` collection

### Invite Team Members
1. Go to Firebase Console → Authentication
2. Create users or have them sign up
3. Assign roles in Firestore `users` collection

### Monitor Usage
1. Firebase Console → Usage
2. Check:
   - Firestore reads/writes
   - Storage data
   - Auth operations
3. Set up billing alerts if needed

## Useful Links

| Service | URL |
|---------|-----|
| Vercel Dashboard | https://vercel.com/dashboard |
| Your Deployment | https://ums-vendor-tracker.vercel.app (example) |
| Firebase Console | https://console.firebase.google.com |
| GitHub | https://github.com |
| Domain Provider | (Your domain registrar) |

## Support

- **Vercel Support**: vercel.com/help
- **Firebase Support**: firebase.google.com/support
- **GitHub Issues**: GitHub repository issues tab

---

**Deployment Status**: ✅ Ready  
**Last Updated**: March 12, 2026  
**Firebase Version**: 9.22.2  
**Node Version**: Not required (static site)
