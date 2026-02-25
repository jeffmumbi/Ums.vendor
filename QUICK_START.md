# UMS Vendor Tracker - Quick Start Guide

## Getting Started in 5 Minutes

### Step 1: Open the Application
- Open `ums-tracker-enhanced.html` in a modern web browser (Chrome, Firefox, Safari, or Edge)
- The application will load with the UMS login screen

### Step 2: Login
Use one of the default credentials:
- **Admin User**:
  - Username: `admin`
  - Password: `admin123`
  - Full access to all features

- **Regular User**:
  - Username: `user`  
  - Password: `user123`
  - Limited to viewing password reminders

### Step 3: Familiarize with the Interface

#### Header
- **UMS Logo & Title**: Shows "UMS Vendor Tracker" with gradient styling
- **Notification Bell**: Shows pending password expiration alerts
- **User Info**: Display current user and role
- **Logout Button**: Red button to exit

#### Sidebar Navigation
- **Dashboard** (Admin): Overview with charts and statistics
- **My Passwords**: Personal password reminder management
- **Vendor Issues** (Admin): Track vendor system issues
- **Reports & Analytics** (Admin): View detailed reports
- **Meeting Documents** (Admin): Upload vendor meeting docs
- **User Management** (Admin): Manage system users

### Step 4: Quick Tasks

#### Task 1: Add a Vendor Issue (Admin)
1. Click "Vendor Issues" in sidebar
2. Click "+ Add Issue" button
3. Fill in the form:
   - **Vendor Name**: Enter vendor name
   - **System Name**: Enter system affected
   - **Description**: Describe the issue
   - **Cause**: What caused it
   - **Impact Level**: Select High/Medium/Low
   - **Downtime**: Enter hours
   - **RCA**: Detailed root cause analysis
   - **Status**: Open/In Progress/Resolved
   - **Resolution**: How to fix it
4. Click "Save Issue"
5. New issue appears in the table

#### Task 2: Set a Password Reminder (All Users)
1. Click "My Passwords" in sidebar
2. Click "+ Add Password Reminder"
3. Fill in the details:
   - **System/Service Name**: e.g., "Email System", "Database", "VPN"
   - **Username/Account**: The account to track
   - **Employee**: (Admin can assign to others)
   - **Expiration Date**: Click to select from calendar
   - **Expiration Time**: Set time
   - **Notes**: Optional additional info
4. Click "Schedule Password Reminder"
5. You'll receive notifications:
   - 7 days before: Initial reminder
   - 2 days before: **Main reminder** 📢
   - 1 day before: Urgent warning
   - On expiration: Critical alert

#### Task 3: View Dashboard (Admin)
1. Click "Dashboard" in sidebar
2. See statistics cards:
   - Total Vendors
   - Open Issues
   - In Progress Issues
   - Resolved Issues
3. View charts:
   - Issue status distribution
   - Impact level breakdown
   - Most affected systems
   - Issues timeline
4. Use dropdown filters to change time range

#### Task 4: Export Data (Admin)
1. Go to "Vendor Issues" section
2. Click "Export PDF" or "Export Excel" buttons
3. File downloads automatically
4. Or go to "Reports & Analytics" for comprehensive reports

### Step 5: Enable Desktop Notifications
1. When prompted on login, allow browser notifications
2. You'll receive system alerts for:
   - Password expirations
   - System issues
   - Actions completion

If not prompted, enable in browser settings:
- Chrome: Settings → Site settings → Notifications
- Firefox: Preferences → Privacy → Notifications

### Step 6: Manage Your Data

#### View Notification Center
- Click the 🔔 bell icon (top right)
- See all notifications with timestamps
- Export notification history
- Clear all notifications

#### Export Your Data
1. Go to "Reports & Analytics"
2. Click "Download Full Report" (PDF or Excel)
3. Includes all issues, trends, and analytics

#### Dark Mode
- Click settings icon (gear ⚙️) in header
- Toggle "Dark Mode" for easier viewing at night

## Common Tasks

### Creating Your First Issue
```
Vendor: TechVendor Inc
System: Email Platform
Cause: Database connection timeout
Impact: High
Downtime: 4 hours
RCA: Connection pool exhausted during peak usage, increased timeout value
Status: Resolved
Resolution: Increased DB connection pool from 50 to 150
```

### Setting Up Password Reminders
```
System: Office 365
Username: admin@company.com
Employee: John Doe
Expires: 2026-03-26
Time: 09:00 AM
```

## Notification Reminders Timeline

**Example: Password expires March 26, 2026**

| Date | Notification | Action |
|------|--------------|--------|
| Mar 19 | "📅 Expires in 1 Week" | Plan renewal |
| Mar 24 | "📢 Expires in 2 Days" | **Update password** |
| Mar 25 | "🔴 Expires Tomorrow" | **Urgent: Update now** |
| Mar 26 | "🚨 Password EXPIRED" | **Critical - Update immediately** |

## Tips & Tricks

1. **Calendar Picker**: Click on date field to open calendar for easy date selection
2. **Filters**: Most tables have search and filter options
3. **Charts**: Hover over charts to see detailed values
4. **Drag & Drop**: File upload supports drag-and-drop
5. **Keyboard**: Use Tab to navigate forms quickly
6. **Mobile**: Works on tablets and phones
7. **Offline**: PWA feature allows offline access to cached data

## Troubleshooting

### No notifications appearing?
- Check browser notification permissions
- Verify desktop notifications are enabled
- Check the notification bell for history

### Can't see admin features?
- Verify you're logged in as Admin user
- Regular users only see password reminders

### Data not saving?
- Check browser LocalStorage is enabled
- Try refreshing the page
- Clear browser cache and reload

### Forgotten password?
- Use default admin (admin/admin123) to reset
- Or clear browser data and restart

## Security Notes

⚠️ **Important**: This demo uses default credentials. For production:
1. Change default passwords immediately
2. Use stronger security passwords
3. Consider implementing authentication backend
4. Don't store sensitive data in notes
5. Regularly export and backup important data
6. Enable HTTPS only in production

## Need Help?

- Check the full README.md for detailed documentation
- Review the sample data loaded by default
- Hover over fields for helpful tooltips
- Contact your IT administrator

---

**Ready to track your vendor issues? Let's get started!** 🚀
