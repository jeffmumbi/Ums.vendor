# UMS Vendor Tracker - Deployment & Setup Guide

## System Overview

The UMS Vendor Tracker is a standalone Progressive Web Application (PWA) that requires no backend server. All data is stored locally in the browser using LocalStorage.

## Files Included

```
files (1)/
├── ums-tracker-enhanced.html    (Main application - start here)
├── app-enhanced.js              (Application logic & functionality)
├── sw.js                        (Service Worker - offline support)
└── manifest.json                (PWA configuration)

Documentation/
├── README.md                    (Complete documentation)
├── QUICK_START.md              (5-minute setup guide)
├── FEATURES.md                 (Feature overview)
└── DEPLOYMENT.md               (This file)
```

## Quick Setup

### Minimum Requirements
- Modern web browser (Chrome 90+, Firefox 88+, Safari 14+, Edge 90+)
- Internet connection (for initial load only)
- 5-10 MB free storage space
- No backend server needed

### Installation Steps

#### Option 1: Local File (Simplest)
1. **Extract Files**: Save all files to a folder on your computer
2. **Open in Browser**:
   - Windows: Right-click `ums-tracker-enhanced.html` → Open with → Chrome/Firefox
   - Mac: Double-click `ums-tracker-enhanced.html`
   - Linux: `firefox ums-tracker-enhanced.html` or `chromium ums-tracker-enhanced.html`
3. **Create Admin User**: Login with admin/admin123
4. **Start Using**: App is ready to use immediately

#### Option 2: Local Web Server (Recommended)

**Using Python:**
```bash
# Python 3.x
python -m http.server 8000

# Python 2.x
python -m SimpleHTTPServer 8000
```
Then open: `http://localhost:8000/ums-tracker-enhanced.html`

**Using Node.js:**
```bash
# Install http-server globally
npm install -g http-server

# Run in the directory with files
http-server

# Open browser to: http://localhost:8080
```

**Using PHP:**
```bash
php -S localhost:8000
```

#### Option 3: Web Hosting (Production)

1. **Upload Files** to web server using FTP/SSH
2. **Access URL**: `https://yourdomain.com/ums-tracker-enhanced.html`
3. **Enable HTTPS**: Required for production
4. **Allow Notifications**: Configure browser permissions

## Configuration

### Default Credentials
**Change these immediately in production!**

```javascript
// Located in app-enhanced.js, line ~30
{
    id: this.generateId(),
    fullName: 'System Administrator',
    username: 'admin',
    password: 'admin123',  // CHANGE THIS
    role: 'Admin',
    createdAt: new Date().toISOString()
}
```

### Changing Default Passwords

1. **Option A - Direct Edit**:
   - Open `app-enhanced.js`
   - Find the `addSampleData()` method
   - Modify the username/password
   - Reload the browser

2. **Option B - Create New User**:
   - Login as admin
   - Go to User Management
   - Create new admin user
   - Delete default user
   - Login with new user

### Customization

#### Logo Customization
Find and replace the UMS logo URL:
```html
<!-- In ums-tracker-enhanced.html, lines 1255 and 1289 -->
<!-- Default: https://umskenya.com/wp-content/uploads/2024/07/umslogo-e1722428157937-120x64.png -->

<!-- Replace with your logo -->
<img src="https://yourcompany.com/logo.png" alt="Company Logo">
```

#### Color Customization
Edit CSS variables in `ums-tracker-enhanced.html`:
```css
:root {
    --primary-blue: #1e3a8a;      /* Main brand color */
    --secondary-blue: #3b82f6;    /* Light accent */
    --red: #dc2626;               /* Highlight color */
    --white: #ffffff;             /* Light backgrounds */
    /* ... more variables ... */
}
```

#### Company Name
Edit in sidebar header (`ums-tracker-enhanced.html`, line ~1357):
```html
<h3 class="sidebar-title">YOUR COMPANY</h3>
```

## Data Management

### Backup & Restore

#### Export All Data (Manual)
1. Go to "Reports & Analytics"
2. Click "Download Full Report (Excel)"
3. File saves to Downloads folder
4. Repeat for Notifications if needed

#### Backup LocalStorage (Advanced)
```javascript
// In browser console (F12)
// Export all data as JSON
localStorage_backup = JSON.stringify(localStorage);
console.log(localStorage_backup);
// Copy output and save to file

// Restore from backup
Object.keys(JSON.parse(backup_string)).forEach(key => {
    localStorage.setItem(key, JSON.parse(backup_string)[key]);
});
```

### Clear All Data
```javascript
// In browser console
localStorage.clear();
location.reload();
```

## Feature Activation

### Enable Desktop Notifications
1. On first login, browser will request permission
2. Click "Allow" when prompted
3. Grant notification permission
4. User will receive push notifications for:
   - Password expirations (2 days before)
   - Password reminders (1, 7 days)
   - System alerts

To enable manually:
- Chrome: Settings → Site settings → Notifications
- Firefox: Preferences → Privacy → Permissions
- Safari: Websites preferences → Notifications

### Enable Dark Mode
- Click settings icon (⚙️) in header
- Toggle "Dark Mode"
- Preference saved automatically

## Security Considerations

### ⚠️ Important Security Notes

1. **Do Not Deploy With Default Credentials**
   - Change admin and user passwords
   - Create unique strong passwords
   - Remove test users

2. **Use HTTPS Only**
   - Never use HTTP in production
   - Use SSL/TLS certificates
   - Enforce HTTPS redirect

3. **Data Privacy**
   - All data stored locally - not sent to servers
   - Users control their own data
   - No cloud sync in this version
   - No third-party tracking

4. **Browser Security**
   - Keep browser updated
   - Disable unnecessary extensions
   - Use security browser settings
   - Clear cache regularly for shared computers

5. **Access Control**
   - Limit admin accounts
   - Regular password changes
   - Monitor user activities
   - Remove inactive users

## Performance Optimization

### Reduce Initial Load Time

1. **Minify Assets** (Production only):
   ```bash
   # Minify JavaScript
   npm install -g terser
   terser app-enhanced.js -o app-enhanced.min.js
   
   # Update HTML to use minified version
   <script src="app-enhanced.min.js"></script>
   ```

2. **Enable Caching**:
   - Service Worker caches assets
   - Subsequent loads are faster
   - Works offline

3. **Lazy Load Data**:
   - Charts load after main content
   - Large datasets load on demand
   - Filters reduce data processing

### Monitor Performance
- Open DevTools (F12)
- Go to Performance tab
- Record page load
- Identify bottlenecks

## Troubleshooting

### Issue: Application won't load
**Solution**:
- Clear browser cache (Ctrl+Shift+Delete)
- Disable extensions temporarily
- Try different browser
- Check browser console for errors (F12)

### Issue: Data not saving
**Solution**:
- Check LocalStorage is enabled:
  - Chrome: Settings → Advanced → Privacy → Cookies and site permissions
- Try private/incognito mode
- Check available storage space
- Clear old data to free up space

### Issue: Notifications not working
**Solution**:
- Grant notification permission
- Check browser notification settings
- Verify time/date is correct on computer
- Check notification center for history

### Issue: Charts not displaying
**Solution**:
- Wait for data to load
- Refresh the page
- Check browser console for errors
- Ensure chart data exists

### Issue: Export not working
**Solution**:
- Update browser to latest version
- Try different export format (PDF vs Excel)
- Check file permissions in Downloads folder
- Verify data exists to export

### Issue: Performance is slow
**Solution**:
- Close other browser tabs
- Disable extensions
- Clear browser cache
- Export and delete old data
- Restart browser

## Integration Points

### Email Integration (Future)
To add email notifications:
1. Implement backend email service
2. Capture email from user
3. Send notifications via email
4. Add email template system

### Slack Integration (Future)
1. Create Slack webhook
2. Send notifications to Slack channel
3. Track issues in Slack
4. Bi-directional sync

### Outlook Calendar (Future)
1. Sync password reminders to Outlook
2. Create calendar events automatically
3. Send Outlook reminders

## Update & Maintenance

### Check for Updates
- Visit UMS documentation site regularly
- Check version: Currently 2.0 Enhanced
- Review changelog for improvements

### Update Process
1. **Backup Current Data**:
   - Export all reports to Excel
   - Save to secure location

2. **Download Latest Version**:
   - Get new files from UMS

3. **Replace Files**:
   - Backup old files
   - Copy new files to directory
   - Verify functionality

4. **Test Changes**:
   - Login as admin
   - Test all features
   - Export test data

## Regular Maintenance Tasks

### Daily
- Monitor notification center
- Check for password expirations
- Review open issues

### Weekly
- Export critical reports
- Review dashboard metrics
- Verify data integrity

### Monthly
- Full data backup
- Update passwords
- Review user access
- Delete old data

### Quarterly
- Update browser versions
- Review security settings
- Audit user accounts
- Archive old issues

## Support & Documentation

### Available Resources
1. **README.md** - Full feature documentation
2. **QUICK_START.md** - 5-minute setup guide
3. **FEATURES.md** - Complete feature matrix
4. **Browser DevTools** - Error debugging (F12)

### Getting Help
- Review documentation first
- Check troubleshooting section
- Search existing issues
- Contact IT administrator

## System Requirements Checklist

Before deploying, verify:

- ✅ Modern browser available
- ✅ 5-10 MB storage space
- ✅ Notification permission granted
- ✅ JavaScript enabled
- ✅ LocalStorage enabled
- ✅ Cookies enabled (for preferences)
- ✅ HTTPS setup (production)
- ✅ Default credentials changed
- ✅ Users created for team
- ✅ Data backup plan in place

## Production Deployment Checklist

- ✅ Change all default passwords
- ✅ Create admin and user accounts
- ✅ Test all features thoroughly
- ✅ Configure HTTPS/SSL
- ✅ Set up regular backups
- ✅ Document system setup
- ✅ Train users
- ✅ Monitor first week closely
- ✅ Collect feedback
- ✅ Plan maintenance schedule

---

## Quick Reference

### Start Application
```
File → Open → ums-tracker-enhanced.html
```

### Change Password
```
As Admin: Users section → Edit user → Change password
As User: Not available (ask admin)
```

### Export Data
```
Reports → Download Full Report (PDF/Excel)
```

### Enable Notifications
```
Browser prompts on login → Click Allow
Or Settings → Notifications → Allow
```

### Backup Data
```
Reports → Download Full Report → Save file
Notifications → Export → Save file
```

### Clear Data
```
Browser DevTools (F12) → Application → Clear storage
```

---

**Version**: 2.0 Enhanced  
**Last Updated**: February 24, 2026  
**Status**: Production Ready

For additional support, contact your IT administrator.
