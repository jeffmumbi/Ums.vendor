# UMS Vendor Tracker & Password Management System

A comprehensive Progressive Web Application (PWA) for tracking vendor system issues and managing password expiration reminders with real-time notifications.

## 🎯 Features

### 1. **Issue Tracking Module**
- **Complete Issue Documentation**: Capture detailed information about system issues:
  - System affected (vendor name and system name)
  - Cause of the issue
  - Impact level (High, Medium, Low)
  - Downtime hours (in hours)
  - Root Cause Analysis (RCA) - detailed technical analysis
  - Resolution status (Open, In Progress, Resolved)
  - Resolution notes

### 2. **Password Management System**
- **Calendar-based Password Reminders**: Set password expiration dates with date/time picker
- **Smart Notification System**: Receive alerts at strategic intervals:
  - **7 days before expiration** - Initial reminder
  - **2 days before expiration** - Main reminder notification (as requested)
  - **1 day before expiration** - Urgent reminder
  - **On expiration date** - Critical alert
- **Assign to Employees**: IT admins can assign password reminders to specific employees
- **Track Expiration**: Monitor all passwords with clear status indicators

### 3. **Real-time Notifications**
- **Desktop Notifications**: Browser-based push notifications for password reminders
- **In-app Notifications**: Toast notifications for all actions
- **Notification Center**: Dedicated panel with notification history and export
- **Smart Alerts**: Different priority levels (info, warning, urgent)

### 4. **Dashboard & Analytics**
- **Real-time Statistics**:
  - Total vendors tracked
  - Open issues count
  - In-progress issues
  - Resolved issues count
- **Visual Analytics**:
  - Issue status distribution (pie/bar chart)
  - Impact level analysis
  - Most affected systems ranking
  - Issues timeline trends
  - Vendor performance metrics
- **Filterable Reports**: By time range (Today, 7 days, 2 weeks, 1 month, 3 months)

### 5. **Vendor Management**
- **Vendor Issue Tracking**: Centralized view of all vendor-related issues
- **Export Capabilities**: PDF and Excel export for issues
- **Detailed Issue Table**: Sortable and filterable data table

### 6. **Meeting Documents**
- **Document Upload**: Manage vendor meeting documentation
- **File Storage**: Support for DOC, DOCX, PDF, TXT (max 10MB)
- **Document Management**: Upload, preview, and delete meeting documents
- **Metadata**: Track meeting date, vendor, notes, and file names

### 7. **User Management** (Admin Only)
- **Multi-user System**: Support for Admin and User roles
- **Role-based Access Control**:
  - **Admin**: Full access to all features
  - **User**: View-only password reminders
- **User CRUD**: Create, read, update, delete users

## 🎨 UMS Branding

### Color Scheme
- **Primary Blue**: #1e3a8a (UMS Corporate Blue)
- **Secondary Blue**: #3b82f6 (Light Blue)
- **Accent Red**: #dc2626 (UMS Red)
- **White**: #ffffff (Clean background)

### Visual Design
- **Header**: Blue to Red gradient with UMS logo
- **Sidebar**: Dark blue gradient with UMS branding and red accent border
- **Modals**: Frosted glass effect with red accent headers
- **Buttons**: Blue-to-red gradients with smooth animations

### Logo
- UMS official logo displayed on:
  - Login page (large, animated)
  - Header (with hover effect)
  - Sidebar (in dedicated header section)

## 📱 User Roles & Access

### Admin Role
- Full dashboard access
- Add and manage vendor issues
- Manage password reminders for all employees
- View analytics and reports
- Export data to PDF/Excel
- User management
- Document management

### User Role
- Access to personal password reminders
- View password expiration dates
- Limited to own password entries

## 🔐 Default Login Credentials

For testing purposes (should be changed in production):
- **Admin User**: 
  - Username: `admin`
  - Password: `admin123`
- **Regular User**: 
  - Username: `user`
  - Password: `user123`

## 📋 How to Use

### Adding a Vendor Issue
1. Click **"Vendor Issues"** in the sidebar (Admin only)
2. Click **"+ Add Issue"** button
3. Fill in the required fields:
   - Vendor Name
   - System Name
   - Issue Description
   - Cause
   - Impact Level
   - Downtime (Hours)
   - Root Cause Analysis (RCA)
   - Status
   - Resolution Notes
4. Click **"Save Issue"**

### Setting Password Reminders
1. Click **"My Passwords"** in the sidebar
2. Click **"+ Add Password Reminder"**
3. Enter:
   - System/Service Name (e.g., Email System)
   - Username/Account
   - Assigned Employee (Admin only)
   - Expiration Date (using calendar picker)
   - Expiration Time
   - Notes (optional)
4. Click **"Schedule Password Reminder"**

### Receiving Notifications
The system automatically notifies you:
- **Desktop Notifications**: If you grant permission during login
- **In-app Toast**: Always visible in bottom right
- **Notification Center**: Click 🔔 bell icon to view full history

### Exporting Data
- **Vendor Issues**: Export to PDF or Excel from Issues section
- **Full Reports**: Generate comprehensive reports in Reports section
- **Notifications**: Export notification history from Notification Center

## 🛠️ Technical Features

### Progressive Web App (PWA)
- Works offline with Service Worker
- Installable on mobile devices
- Fast loading with modern bundling

### Data Storage
- **LocalStorage**: All data stored locally (in-browser)
- **No Server Required**: Completely self-contained
- **Data Persistence**: Survives browser restarts

### Responsive Design
- **Desktop**: Full-featured interface
- **Tablet**: Optimized layout
- **Mobile**: Touch-friendly navigation

### Performance
- **Chart.js**: Real-time data visualizations
- **jsPDF & XLSX**: Fast export capabilities
- **Debounced Filtering**: Smooth chart interactions

### Dark Mode
- Toggle dark mode from settings
- Preserves preference in LocalStorage
- Smooth transitions between themes

## 📊 Sample Data

The system includes sample vendor issues and password reminders for demonstration:
- **TechSoft Solutions** - HR Management System authentication issue
- **DataCore Analytics** - BI Platform currency conversion error
- **CloudNet Services** - File Storage bandwidth limitation

## 🔄 Password Reminder Timeline

Example: If password expires on Feb 26, 2026
- **Feb 19, 2026**: 7-day reminder notification
- **Feb 24, 2026**: **2-day reminder notification** ⭐ (Main reminder as requested)
- **Feb 25, 2026**: 1-day urgent reminder
- **Feb 26, 2026**: Expired alert

## 📱 Supported Browsers

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 💾 Data Privacy

All data is stored locally in your browser's LocalStorage. No data is sent to any server. To clear all data:
1. Clear browser LocalStorage for this domain
2. Or use developer tools → Application → Clear storage

## 🎓 Best Practices

1. **Regular Backups**: Export your data regularly to PDF/Excel
2. **Password Security**: Don't store actual passwords, only reminders
3. **Notification Setup**: Allow desktop notifications for timely alerts
4. **Regular Reviews**: Check dashboard weekly for system health
5. **Issue Documentation**: Keep RCA notes detailed for future reference

## 🚀 Future Enhancements

Potential features for future versions:
- Cloud sync across devices
- Email notifications integration
- Slack/Teams integration
- Advanced analytics with trends
- Issue severity scoring
- SLA tracking
- Automated remediation tracking

## 📞 Support

For issues or feature requests related to the UMS Vendor Tracker system, contact your IT administrator.

---

**Version**: 2.0  
**Last Updated**: February 24, 2026  
**Status**: Production Ready
