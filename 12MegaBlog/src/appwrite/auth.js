import conf from '../conf/conf.js';
import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor() {
        // Initialize Appwrite client
        this.client
            .setEndpoint(conf.appwriteUrl)      // API endpoint from conf.js
            .setProject(conf.appwriteProjectId); // Project ID from conf.js

        this.account = new Account(this.client);
    }

    // Create a new account and auto-login
    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(
                ID.unique(),
                email,
                password,
                name
            );

            // Auto-login if account creation succeeds
            if (userAccount) {
                return await this.login({ email, password });
            }
            return userAccount;
        } catch (error) {
            console.error("AuthService :: createAccount :: error =>", error.message);
            throw error;
        }
    }

    // Login user
    async login({ email, password }) {
    try {
        return await this.account.createEmailPasswordSession(email, password);
    } catch (error) {
        console.error("AuthService :: login :: error =>", error.message);
        throw error;
    }
}


    // Get current logged-in user
    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("AuthService :: getCurrentUser :: error =>", error.message);
            return null;
        }
    }

    // Logout user
    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("AuthService :: logout :: error =>", error.message);
        }
    }
}

const authService = new AuthService();
export default authService;
