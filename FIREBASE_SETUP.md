# Firebase Integration Setup Guide

## Overview

Your UMS Vendor Tracker has been configured to use **Firebase** as the backend database. This guide walks you through setting up Firebase for your application.

## Benefits of Firebase

✅ **Real-time Database** - Automatic data sync across devices  
✅ **Authentication** - Built-in user management with email/password  
✅ **Cloud Storage** - Store documents in the cloud  
✅ **Serverless** - No backend server needed  
✅ **Scalable** - Grows with your application  
✅ **Free Tier** - Start free, pay as you grow  

## Step-by-Step Setup

### Step 1: Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Create a project"** or **"Add project"**
3. Enter your project name: **`ums-vendor-tracker`**
4. (Optional) Enable Google Analytics
5. Click **"Create project"** and wait for setup to complete

### Step 2: Get Your Firebase Credentials

1. In the Firebase Console, click the **Settings icon** (⚙️) → **Project Settings**
2. Scroll down to **"Your apps"** section
3. Click **"Add app"** and select **"Web"** icon (</>)
4. Enter your app name: **`UMS Vendor Tracker`**
5. Click **"Register app"**
6. You'll see a code block like this:

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDxxxxxxxxxxxxxxxxx",
  authDomain: "ums-vendor-tracker.firebaseapp.com",
  projectId: "ums-vendor-tracker",
  storageBucket: "ums-vendor-tracker.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:xxxxxxxxxxxxxxx"
};
```

### Step 3: Configure Your Application

1. Open `firebase-config.js` in your project
2. Replace the placeholder values with your credentials:

```javascript
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",           // Paste your apiKey
    authDomain: "YOUR_AUTH_DOMAIN",   // Paste your authDomain
    projectId: "YOUR_PROJECT_ID",      // Paste your projectId
    storageBucket: "YOUR_STORAGE_BUCKET",  // Paste your storageBucket
    messagingSenderId: "YOUR_SENDER_ID",   // Paste your messagingSenderId
    appId: "YOUR_APP_ID"               // Paste your appId
};
```

3. Save the file

### Step 4: Enable Firestore Database

1. In Firebase Console, go to **"Firestore Database"** (left sidebar)
2. Click **"Create database"**
3. Select **"Start in production mode"**
4. Choose your location (closest to your users)
5. Click **"Create"**

### Step 5: Enable Authentication

1. In Firebase Console, go to **"Authentication"** (left sidebar)
2. Click **"Sign-in method"** tab
3. Click **"Email/Password"**
4. Enable it and save

### Step 6: Configure Security Rules

1. Go to **Firestore Database** → **Rules** tab
2. Replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to access their data
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

### Step 7: Enable Storage (for Documents)

1. In Firebase Console, go to **"Storage"** (left sidebar)
2. Click **"Get started"**
3. Select **"Start in production mode"**
4. Choose your location
5. Click **"Done"**

### Step 8: Configure Storage Rules

1. Go to **Storage** → **Rules** tab
2. Replace with:

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /documents/{allPaths=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

3. Click **"Publish"**

## Testing the Setup

1. Open your application in a browser
2. Open **Browser Console** (F12 → Console tab)
3. Look for these messages:
   - ✅ "Firebase initialized successfully"
   - ✅ "Firebase bridge initialized - Using cloud storage"

If you see errors, check that:
- ✅ `firebase-config.js` has correct credentials
- ✅ All three services are enabled (Firestore, Auth, Storage)
- ✅ Security rules are published

## Application Features

### Offline Mode
If Firebase is unavailable, the app automatically falls back to **localStorage** - no data loss!

### Auto-Sync
When you return online, data syncs automatically.

### Hybrid Storage
- **Issues**: Stored in Firestore collection `issues`
- **Passwords**: Stored in Firestore collection `passwords`
- **Incidents**: Stored in Firestore collection `incidents`
- **Documents**: Files stored in Firebase Storage, metadata in Firestore
- **Notifications**: Stored in Firestore collection `notifications`
- **Users**: Stored in Firestore collection `users` + Firebase Auth

## JavaScript Integration

The app uses two main modules:

### `firebase-config.js`
- Firebase initialization
- `FirebaseService` object with all database methods
- Low-level operations

### `firebase-integration.js`
- `FirebaseDataBridge` class
- Hybrid storage (Firebase + localStorage fallback)
- High-level operations that the app uses

### Existing `DataManager`
The current `DataManager` class in your HTML continues to work with localStorage. You can optionally replace calls to use the bridge:

```javascript
// Current code (localStorage only)
DataManager.saveIssue(issue);

// With Firebase integration
await FirebaseDataBridge_Instance.saveIssue(issue);
```

## Deployment to Vercel

If deploying to Vercel:

1. Your `firebase-config.js` is safe to commit (API key is restricted)
2. Vercel automatically serves your static files
3. Firebase handles all backend logic

## Environment Variables (Optional)

For extra security, you can use environment variables:

```javascript
// Instead of hardcoding, use environment variables
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    // ... other fields
};
```

## Troubleshooting

### Firebase SDK not loading
- Check browser console for CORS errors
- Ensure HTML has the Firebase SDK script tags
- Verify CDN links are correct

### "Permission denied" errors
- Check Firestore Security Rules are published
- Ensure user is authenticated
- Review rule syntax at `/rules` tab

### Data not syncing
- Open browser console (F12)
- Check for errors
- Verify Firebase credentials are correct
- Check Firestore quota in Firebase Console

### Document upload fails
- Ensure Storage is enabled
- Check Storage Rules are published
- Verify file size is reasonable

## Firebase Console Resources

| Feature | Link |
|---------|------|
| Firestore | `firebase.google.com` → Select project → Firestore Database |
| Authentication | `firebase.google.com` → Select project → Authentication |
| Storage | `firebase.google.com` → Select project → Storage |
| Rules | Each service has Rules tab |
| Monitoring | `firebase.google.com` → Select project → Usage |

## Next Steps

1. ✅ Complete the setup above
2. ✅ Test with sample data
3. ✅ Create your first admin user
4. ✅ Deploy to Vercel or your hosting
5. ✅ Monitor Firebase Console for usage

## Support & Documentation

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Guide](https://firebase.google.com/docs/firestore)
- [Firebase Auth](https://firebase.google.com/docs/auth)
- [Firebase Storage](https://firebase.google.com/docs/storage)

---

**Last Updated**: March 12, 2026
**Status**: ✅ Ready for Configuration
