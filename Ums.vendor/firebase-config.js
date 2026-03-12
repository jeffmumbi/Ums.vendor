/**
 * Firebase Configuration Module
 * 
 * This file contains Firebase setup and initialization.
 * Replace the config values with your Firebase project credentials.
 */

// Import Firebase modules (included via CDN in HTML)
// - firebase/app
// - firebase/auth
// - firebase/firestore
// - firebase/storage

// Firebase Configuration Object
// Get these values from your Firebase Console
const firebaseConfig = {
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  apiKey: "AIzaSyAO8CtTbUKBmcwhJ-vNq6PHpA2EG7AsniE",
  authDomain: "ums-vendor-system.firebaseapp.com",
  databaseURL: "https://ums-vendor-system-default-rtdb.firebaseio.com",
  projectId: "ums-vendor-system",
  storageBucket: "ums-vendor-system.firebasestorage.app",
  messagingSenderId: "422357463754",
  appId: "1:422357463754:web:73dfee2a8073834fb63a33",
  measurementId: "G-24M8H4QQ0R"
};

/**
 * Initialize Firebase
 * This should be called once when the app loads
 */
let db = null;
let auth = null;
let storage = null;

async function initializeFirebase() {
    try {
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        
        // Initialize Firebase services
        db = firebase.firestore();
        auth = firebase.auth();
        storage = firebase.storage();
        
        console.log('✅ Firebase initialized successfully');
        return true;
    } catch (error) {
        console.error('❌ Firebase initialization error:', error);
        return false;
    }
}

/**
 * Firebase Firestore Service
 * Handles all database operations
 */
const FirebaseService = {
    /**
     * Initialize collections with sample data if they don't exist
     */
    async initializeCollections() {
        try {
            const collections = ['issues', 'passwords', 'documents', 'incidents', 'users', 'notifications'];
            
            for (const collection of collections) {
                const snapshot = await db.collection(collection).limit(1).get();
                if (snapshot.empty) {
                    console.log(`Initializing ${collection} collection...`);
                    // Collections will be created when first document is added
                }
            }
            
            console.log('✅ Collections ready');
            return true;
        } catch (error) {
            console.error('Error initializing collections:', error);
            return false;
        }
    },

    /**
     * ISSUES OPERATIONS
     */
    async addIssue(issue) {
        try {
            const docRef = await db.collection('issues').add({
                ...issue,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            console.log('Issue added:', docRef.id);
            return { id: docRef.id, ...issue };
        } catch (error) {
            console.error('Error adding issue:', error);
            throw error;
        }
    },

    async getIssues() {
        try {
            const snapshot = await db.collection('issues').orderBy('createdAt', 'desc').get();
            const issues = [];
            snapshot.forEach(doc => {
                issues.push({ id: doc.id, ...doc.data() });
            });
            return issues;
        } catch (error) {
            console.error('Error getting issues:', error);
            return [];
        }
    },

    async updateIssue(id, data) {
        try {
            await db.collection('issues').doc(id).update({
                ...data,
                updatedAt: new Date().toISOString()
            });
            console.log('Issue updated:', id);
            return true;
        } catch (error) {
            console.error('Error updating issue:', error);
            throw error;
        }
    },

    async deleteIssue(id) {
        try {
            await db.collection('issues').doc(id).delete();
            console.log('Issue deleted:', id);
            return true;
        } catch (error) {
            console.error('Error deleting issue:', error);
            throw error;
        }
    },

    /**
     * PASSWORD OPERATIONS
     */
    async addPassword(password) {
        try {
            const docRef = await db.collection('passwords').add({
                ...password,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            console.log('Password added:', docRef.id);
            return { id: docRef.id, ...password };
        } catch (error) {
            console.error('Error adding password:', error);
            throw error;
        }
    },

    async getPasswords() {
        try {
            const snapshot = await db.collection('passwords').orderBy('expiryDate', 'asc').get();
            const passwords = [];
            snapshot.forEach(doc => {
                passwords.push({ id: doc.id, ...doc.data() });
            });
            return passwords;
        } catch (error) {
            console.error('Error getting passwords:', error);
            return [];
        }
    },

    async updatePassword(id, data) {
        try {
            await db.collection('passwords').doc(id).update({
                ...data,
                updatedAt: new Date().toISOString()
            });
            console.log('Password updated:', id);
            return true;
        } catch (error) {
            console.error('Error updating password:', error);
            throw error;
        }
    },

    async deletePassword(id) {
        try {
            await db.collection('passwords').doc(id).delete();
            console.log('Password deleted:', id);
            return true;
        } catch (error) {
            console.error('Error deleting password:', error);
            throw error;
        }
    },

    /**
     * DOCUMENT OPERATIONS
     */
    async addDocument(document) {
        try {
            // If there's a file to upload, upload it first
            let fileUrl = null;
            if (document.file) {
                fileUrl = await FirebaseService.uploadFile(document.file);
            }

            const docRef = await db.collection('documents').add({
                title: document.title,
                date: document.date,
                vendor: document.vendor,
                notes: document.notes,
                filename: document.filename,
                fileUrl: fileUrl,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            console.log('Document added:', docRef.id);
            return { id: docRef.id, ...document };
        } catch (error) {
            console.error('Error adding document:', error);
            throw error;
        }
    },

    async getDocuments() {
        try {
            const snapshot = await db.collection('documents').orderBy('date', 'desc').get();
            const documents = [];
            snapshot.forEach(doc => {
                documents.push({ id: doc.id, ...doc.data() });
            });
            return documents;
        } catch (error) {
            console.error('Error getting documents:', error);
            return [];
        }
    },

    async deleteDocument(id) {
        try {
            await db.collection('documents').doc(id).delete();
            console.log('Document deleted:', id);
            return true;
        } catch (error) {
            console.error('Error deleting document:', error);
            throw error;
        }
    },

    /**
     * INCIDENT OPERATIONS
     */
    async addIncident(incident) {
        try {
            const docRef = await db.collection('incidents').add({
                ...incident,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString()
            });
            console.log('Incident added:', docRef.id);
            return { id: docRef.id, ...incident };
        } catch (error) {
            console.error('Error adding incident:', error);
            throw error;
        }
    },

    async getIncidents() {
        try {
            const snapshot = await db.collection('incidents').orderBy('createdAt', 'desc').get();
            const incidents = [];
            snapshot.forEach(doc => {
                incidents.push({ id: doc.id, ...doc.data() });
            });
            return incidents;
        } catch (error) {
            console.error('Error getting incidents:', error);
            return [];
        }
    },

    async updateIncident(id, data) {
        try {
            await db.collection('incidents').doc(id).update({
                ...data,
                updatedAt: new Date().toISOString()
            });
            console.log('Incident updated:', id);
            return true;
        } catch (error) {
            console.error('Error updating incident:', error);
            throw error;
        }
    },

    async deleteIncident(id) {
        try {
            await db.collection('incidents').doc(id).delete();
            console.log('Incident deleted:', id);
            return true;
        } catch (error) {
            console.error('Error deleting incident:', error);
            throw error;
        }
    },

    /**
     * USER OPERATIONS
     */
    async createUser(email, password, userData) {
        try {
            const userCredential = await auth.createUserWithEmailAndPassword(email, password);
            const userId = userCredential.user.uid;
            
            // Save additional user data to Firestore
            await db.collection('users').doc(userId).set({
                ...userData,
                email: email,
                role: userData.role || 'User',
                createdAt: new Date().toISOString()
            });
            
            console.log('User created:', userId);
            return { uid: userId, ...userData };
        } catch (error) {
            console.error('Error creating user:', error);
            throw error;
        }
    },

    async loginUser(email, password) {
        try {
            const userCredential = await auth.signInWithEmailAndPassword(email, password);
            console.log('User logged in:', userCredential.user.uid);
            return userCredential.user;
        } catch (error) {
            console.error('Error logging in:', error);
            throw error;
        }
    },

    async getCurrentUser() {
        return new Promise((resolve) => {
            auth.onAuthStateChanged((user) => {
                resolve(user);
            });
        });
    },

    async getUserData(userId) {
        try {
            const doc = await db.collection('users').doc(userId).get();
            if (doc.exists) {
                return { uid: userId, ...doc.data() };
            }
            return null;
        } catch (error) {
            console.error('Error getting user data:', error);
            return null;
        }
    },

    async updateUser(userId, data) {
        try {
            await db.collection('users').doc(userId).update({
                ...data,
                updatedAt: new Date().toISOString()
            });
            console.log('User updated:', userId);
            return true;
        } catch (error) {
            console.error('Error updating user:', error);
            throw error;
        }
    },

    async getAllUsers() {
        try {
            const snapshot = await db.collection('users').get();
            const users = [];
            snapshot.forEach(doc => {
                users.push({ uid: doc.id, ...doc.data() });
            });
            return users;
        } catch (error) {
            console.error('Error getting users:', error);
            return [];
        }
    },

    async deleteUser(userId) {
        try {
            // Delete from Firestore
            await db.collection('users').doc(userId).delete();
            console.log('User deleted:', userId);
            return true;
        } catch (error) {
            console.error('Error deleting user:', error);
            throw error;
        }
    },

    async logoutUser() {
        try {
            await auth.signOut();
            console.log('User logged out');
            return true;
        } catch (error) {
            console.error('Error logging out:', error);
            throw error;
        }
    },

    /**
     * NOTIFICATIONS OPERATIONS
     */
    async addNotification(notification) {
        try {
            const docRef = await db.collection('notifications').add({
                ...notification,
                timestamp: new Date().toISOString()
            });
            console.log('Notification added:', docRef.id);
            return { id: docRef.id, ...notification };
        } catch (error) {
            console.error('Error adding notification:', error);
            throw error;
        }
    },

    async getNotifications(limit = 50) {
        try {
            const snapshot = await db.collection('notifications')
                .orderBy('timestamp', 'desc')
                .limit(limit)
                .get();
            const notifications = [];
            snapshot.forEach(doc => {
                notifications.push({ id: doc.id, ...doc.data() });
            });
            return notifications;
        } catch (error) {
            console.error('Error getting notifications:', error);
            return [];
        }
    },

    async deleteNotification(id) {
        try {
            await db.collection('notifications').doc(id).delete();
            return true;
        } catch (error) {
            console.error('Error deleting notification:', error);
            throw error;
        }
    },

    /**
     * FILE UPLOAD OPERATIONS
     */
    async uploadFile(file) {
        try {
            const timestamp = Date.now();
            const filename = `${timestamp}_${file.name}`;
            const ref = storage.ref().child(`documents/${filename}`);
            
            await ref.put(file);
            const downloadUrl = await ref.getDownloadURL();
            
            console.log('File uploaded:', downloadUrl);
            return downloadUrl;
        } catch (error) {
            console.error('Error uploading file:', error);
            throw error;
        }
    },

    /**
     * BATCH OPERATIONS
     */
    async migrateFromLocalStorage(localStorageData) {
        try {
            const batch = db.batch();
            
            // Migrate issues
            if (localStorageData.issues) {
                localStorageData.issues.forEach(issue => {
                    const ref = db.collection('issues').doc();
                    batch.set(ref, {
                        ...issue,
                        createdAt: issue.createdAt || new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    });
                });
            }
            
            // Migrate passwords
            if (localStorageData.passwords) {
                localStorageData.passwords.forEach(pwd => {
                    const ref = db.collection('passwords').doc();
                    batch.set(ref, {
                        ...pwd,
                        createdAt: pwd.createdAt || new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    });
                });
            }
            
            // Migrate incidents
            if (localStorageData.incidents) {
                localStorageData.incidents.forEach(incident => {
                    const ref = db.collection('incidents').doc();
                    batch.set(ref, {
                        ...incident,
                        createdAt: incident.createdAt || new Date().toISOString(),
                        updatedAt: new Date().toISOString()
                    });
                });
            }
            
            await batch.commit();
            console.log('✅ Data migrated from localStorage to Firebase');
            return true;
        } catch (error) {
            console.error('Error migrating data:', error);
            return false;
        }
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { initializeFirebase, FirebaseService };
}
