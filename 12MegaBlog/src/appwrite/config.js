import conf from '../conf/conf.js';
import { Client, ID, Databases, Storage } from "appwrite";

class Service {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteUrl)
      .setProject(conf.appwriteProjectId);

    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  // Create Post
  async createPost({ title, slug, content, featuredImage, userId }) {
    try {
      return await this.databases.createDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        ID.unique(), //  Use unique ID
        { title, content, featuredImage, userId }
      );
    } catch (error) {
      console.log("Appwrite service :: createPost :: error", error);
      return null;
    }
  }

  // Update Post
  async updatePost(docId, { title, content, featuredImage }) {
    try {
      return await this.databases.updateDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        docId,
        { title, content, featuredImage }
      );
    } catch (error) {
      console.log("Appwrite service :: updatePost :: error", error);
      return null;
    }
  }

  // Delete Post
  async deletePost(docId) {
    if (!docId) return false;
    try {
      await this.databases.deleteDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        docId
      );
      return true;
    } catch (error) {
      console.log("Appwrite service :: deletePost :: error", error);
      return false;
    }
  }

  // Get single post
  async getPost(docId) {
    try {
      return await this.databases.getDocument(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        docId
      );
    } catch (error) {
      console.log("Appwrite service :: getPost :: error", error);
      return null;
    }
  }

  // Get multiple posts
  async getPosts(queries = []) {
    try {
      return await this.databases.listDocuments(
        conf.appwriteDatabaseId,
        conf.appwriteCollectionId,
        queries
      );
    } catch (error) {
      console.log("Appwrite service :: getPosts :: error", error);
      return [];
    }
  }

  // File upload
  async uploadFile(file) {
    if (!file) return null;
    try {
      return await this.bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
    } catch (error) {
      console.log("Appwrite service :: uploadFile :: error", error);
      return null;
    }
  }

  async deleteFile(fileId) {
    if (!fileId) return false;
    try {
      await this.bucket.deleteFile(conf.appwriteBucketId, fileId);
      return true;
    } catch (error) {
      console.log("Appwrite service :: deleteFile :: error", error);
      return false;
    }
  }

  getFileView(fileId) {
    if (!fileId) return "";
    return this.bucket.getFileView(conf.appwriteBucketId, fileId); // ✅ Correct way to display images
  }
}

const service = new Service();
export default service;
