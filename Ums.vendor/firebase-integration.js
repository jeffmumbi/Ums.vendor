/**
 * Firebase Integration Module
 * 
 * This module provides a bridge between the existing localStorage-based DataManager
 * and Firebase. It can work in two modes:
 * - Offline Mode: Uses localStorage when Firebase is not available
 * - Online Mode: Uses Firebase for real-time sync and cloud storage
 */

class FirebaseDataBridge {
    constructor() {
        this.useFirebase = false;
        this.isSyncing = false;
        this.syncQueue = [];
    }

    /**
     * Initialize the bridge
     * Checks if Firebase is available and ready
     */
    async initialize() {
        try {
            // Check if Firebase is initialized
            const user = await FirebaseService.getCurrentUser();
            this.useFirebase = !!user || (typeof db !== 'undefined' && db);
            
            if (this.useFirebase) {
                await this.syncLocalToFirebase();
                console.log('✅ Firebase bridge initialized - Using cloud storage');
            } else {
                console.log('ℹ️ Firebase not available - Using localStorage');
            }
            return true;
        } catch (error) {
            console.warn('Firebase bridge initialization warning:', error);
            this.useFirebase = false;
            return false;
        }
    }

    /**
     * Sync all localStorage data to Firebase (one-time migration)
     */
    async syncLocalToFirebase() {
        try {
            if (!this.useFirebase) return false;
            if (this.isSyncing) return false;
            
            this.isSyncing = true;
            console.log('🔄 Syncing localStorage to Firebase...');

            const localData = {
                issues: JSON.parse(localStorage.getItem('issues') || '[]'),
                passwords: JSON.parse(localStorage.getItem('passwords') || '[]'),
                incidents: JSON.parse(localStorage.getItem('incidents') || '[]'),
                documents: JSON.parse(localStorage.getItem('documents') || '[]'),
                notifications: JSON.parse(localStorage.getItem('notifications') || '[]')
            };

            // Check if data already synced
            const existingIssues = await FirebaseService.getIssues();
            if (existingIssues.length > 0) {
                console.log('ℹ️ Firebase already has data - skipping sync');
                this.isSyncing = false;
                return true;
            }

            const result = await FirebaseService.migrateFromLocalStorage(localData);
            this.isSyncing = false;

            if (result) {
                console.log('✅ Data synced to Firebase');
                return true;
            } else {
                console.warn('⚠️ Partial sync - some data may not have synced');
                return false;
            }
        } catch (error) {
            console.error('Sync error:', error);
            this.isSyncing = false;
            this.useFirebase = false;
            return false;
        }
    }

    /**
     * ISSUES - Get all issues
     * Falls back to localStorage if Firebase unavailable
     */
    async getIssues() {
        try {
            if (this.useFirebase) {
                const issues = await FirebaseService.getIssues();
                // Ensure backward compatibility with id field
                return issues.map(i => ({ ...i, id: i.id || i.docId }));
            }
        } catch (error) {
            console.warn('Firebase getIssues failed, using localStorage:', error);
            this.useFirebase = false;
        }
        
        // Fallback to localStorage
        return JSON.parse(localStorage.getItem('issues') || '[]');
    }

    /**
     * ISSUES - Add new issue
     */
    async saveIssue(issue) {
        try {
            if (this.useFirebase) {
                if (issue.id && typeof issue.id !== 'string') {
                    // Update existing
                    await FirebaseService.updateIssue(issue.id, issue);
                } else {
                    // Add new
                    return await FirebaseService.addIssue(issue);
                }
                return issue;
            }
        } catch (error) {
            console.warn('Firebase saveIssue failed, using localStorage:', error);
            this.useFirebase = false;
        }

        // Fallback to localStorage
        const issues = JSON.parse(localStorage.getItem('issues') || '[]');
        if (issue.id) {
            const index = issues.findIndex(i => i.id === issue.id);
            if (index !== -1) issues[index] = issue;
        } else {
            issue.id = Date.now();
            issues.push(issue);
        }
        localStorage.setItem('issues', JSON.stringify(issues));
        return issue;
    }

    /**
     * ISSUES - Delete issue
     */
    async deleteIssue(id) {
        try {
            if (this.useFirebase && typeof id === 'string') {
                return await FirebaseService.deleteIssue(id);
            }
        } catch (error) {
            console.warn('Firebase deleteIssue failed, using localStorage:', error);
            this.useFirebase = false;
        }

        // Fallback to localStorage
        let issues = JSON.parse(localStorage.getItem('issues') || '[]');
        issues = issues.filter(i => i.id !== id);
        localStorage.setItem('issues', JSON.stringify(issues));
        return true;
    }

    /**
     * PASSWORDS - Get all passwords
     */
    async getPasswords() {
        try {
            if (this.useFirebase) {
                const passwords = await FirebaseService.getPasswords();
                return passwords.map(p => ({ ...p, id: p.id || p.docId }));
            }
        } catch (error) {
            console.warn('Firebase getPasswords failed, using localStorage:', error);
            this.useFirebase = false;
        }

        return JSON.parse(localStorage.getItem('passwords') || '[]');
    }

    /**
     * PASSWORDS - Save password
     */
    async savePassword(password) {
        try {
            if (this.useFirebase) {
                if (password.id && typeof password.id !== 'string') {
                    await FirebaseService.updatePassword(password.id, password);
                } else {
                    return await FirebaseService.addPassword(password);
                }
                return password;
            }
        } catch (error) {
            console.warn('Firebase savePassword failed, using localStorage:', error);
            this.useFirebase = false;
        }

        const passwords = JSON.parse(localStorage.getItem('passwords') || '[]');
        if (password.id) {
            const index = passwords.findIndex(p => p.id === password.id);
            if (index !== -1) passwords[index] = password;
        } else {
            password.id = Date.now();
            passwords.push(password);
        }
        localStorage.setItem('passwords', JSON.stringify(passwords));
        return password;
    }

    /**
     * PASSWORDS - Delete password
     */
    async deletePassword(id) {
        try {
            if (this.useFirebase && typeof id === 'string') {
                return await FirebaseService.deletePassword(id);
            }
        } catch (error) {
            console.warn('Firebase deletePassword failed, using localStorage:', error);
            this.useFirebase = false;
        }

        let passwords = JSON.parse(localStorage.getItem('passwords') || '[]');
        passwords = passwords.filter(p => p.id !== id);
        localStorage.setItem('passwords', JSON.stringify(passwords));
        return true;
    }

    /**
     * DOCUMENTS - Get all documents
     */
    async getDocuments() {
        try {
            if (this.useFirebase) {
                const documents = await FirebaseService.getDocuments();
                return documents.map(d => ({ ...d, id: d.id || d.docId }));
            }
        } catch (error) {
            console.warn('Firebase getDocuments failed, using localStorage:', error);
            this.useFirebase = false;
        }

        return JSON.parse(localStorage.getItem('documents') || '[]');
    }

    /**
     * DOCUMENTS - Save document
     */
    async saveDocument(doc) {
        try {
            if (this.useFirebase) {
                // Upload file if present
                if (doc.file) {
                    doc.fileUrl = await FirebaseService.uploadFile(doc.file);
                    delete doc.filedata; // Remove base64 data
                }
                const result = await FirebaseService.addDocument(doc);
                return result;
            }
        } catch (error) {
            console.warn('Firebase saveDocument failed, using localStorage:', error);
            this.useFirebase = false;
        }

        // Fallback - keep in localStorage with base64
        const documents = JSON.parse(localStorage.getItem('documents') || '[]');
        doc.id = Date.now();
        documents.push(doc);
        localStorage.setItem('documents', JSON.stringify(documents));
        return doc;
    }

    /**
     * DOCUMENTS - Delete document
     */
    async deleteDocument(id) {
        try {
            if (this.useFirebase && typeof id === 'string') {
                return await FirebaseService.deleteDocument(id);
            }
        } catch (error) {
            console.warn('Firebase deleteDocument failed, using localStorage:', error);
            this.useFirebase = false;
        }

        let documents = JSON.parse(localStorage.getItem('documents') || '[]');
        documents = documents.filter(d => d.id !== id);
        localStorage.setItem('documents', JSON.stringify(documents));
        return true;
    }

    /**
     * INCIDENTS - Get all incidents
     */
    async getIncidents() {
        try {
            if (this.useFirebase) {
                const incidents = await FirebaseService.getIncidents();
                return incidents.map(i => ({ ...i, id: i.id || i.docId }));
            }
        } catch (error) {
            console.warn('Firebase getIncidents failed, using localStorage:', error);
            this.useFirebase = false;
        }

        return JSON.parse(localStorage.getItem('incidents') || '[]');
    }

    /**
     * INCIDENTS - Save incident
     */
    async saveIncident(incident) {
        try {
            if (this.useFirebase) {
                if (incident.id && typeof incident.id !== 'string') {
                    await FirebaseService.updateIncident(incident.id, incident);
                } else {
                    return await FirebaseService.addIncident(incident);
                }
                return incident;
            }
        } catch (error) {
            console.warn('Firebase saveIncident failed, using localStorage:', error);
            this.useFirebase = false;
        }

        const incidents = JSON.parse(localStorage.getItem('incidents') || '[]');
        if (incident.id) {
            const index = incidents.findIndex(i => i.id === incident.id);
            if (index !== -1) incidents[index] = incident;
        } else {
            incident.id = Date.now();
            incidents.push(incident);
        }
        localStorage.setItem('incidents', JSON.stringify(incidents));
        return incident;
    }

    /**
     * INCIDENTS - Delete incident
     */
    async deleteIncident(id) {
        try {
            if (this.useFirebase && typeof id === 'string') {
                return await FirebaseService.deleteIncident(id);
            }
        } catch (error) {
            console.warn('Firebase deleteIncident failed, using localStorage:', error);
            this.useFirebase = false;
        }

        let incidents = JSON.parse(localStorage.getItem('incidents') || '[]');
        incidents = incidents.filter(i => i.id !== id);
        localStorage.setItem('incidents', JSON.stringify(incidents));
        return true;
    }

    /**
     * NOTIFICATIONS - Add notification
     */
    async addNotification(notification) {
        try {
            if (this.useFirebase) {
                return await FirebaseService.addNotification(notification);
            }
        } catch (error) {
            console.warn('Firebase addNotification failed, using localStorage:', error);
            this.useFirebase = false;
        }

        const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
        notification.id = Date.now();
        notification.timestamp = new Date().toISOString();
        notifications.unshift(notification);
        if (notifications.length > 50) notifications.pop();
        localStorage.setItem('notifications', JSON.stringify(notifications));
        return notification;
    }

    /**
     * NOTIFICATIONS - Get notifications
     */
    async getNotifications(limit = 50) {
        try {
            if (this.useFirebase) {
                const notifications = await FirebaseService.getNotifications(limit);
                return notifications.map(n => ({ ...n, id: n.id || n.docId }));
            }
        } catch (error) {
            console.warn('Firebase getNotifications failed, using localStorage:', error);
            this.useFirebase = false;
        }

        const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
        return notifications.slice(0, limit);
    }

    /**
     * NOTIFICATIONS - Clear all notifications
     */
    async clearNotifications() {
        try {
            if (this.useFirebase) {
                const notifications = await FirebaseService.getNotifications(999);
                for (const notif of notifications) {
                    await FirebaseService.deleteNotification(notif.id);
                }
                return true;
            }
        } catch (error) {
            console.warn('Firebase clearNotifications failed, using localStorage:', error);
            this.useFirebase = false;
        }

        localStorage.setItem('notifications', JSON.stringify([]));
        return true;
    }

    /**
     * Check if Firebase is actively being used
     */
    isUsingFirebase() {
        return this.useFirebase;
    }

    /**
     * Get bridge status
     */
    getStatus() {
        return {
            usingFirebase: this.useFirebase,
            isSyncing: this.isSyncing,
            queueLength: this.syncQueue.length
        };
    }
}

// Create global instance
const FirebaseDataBridge_Instance = new FirebaseDataBridge();

// Initialize on page load
window.addEventListener('load', async () => {
    setTimeout(async () => {
        await FirebaseDataBridge_Instance.initialize();
    }, 500);
});
