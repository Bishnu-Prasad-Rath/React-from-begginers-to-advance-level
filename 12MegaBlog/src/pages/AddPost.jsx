import React from "react";
import { Container, PostForm } from "../components";

function AddPost() {
  return (
    <div className="py-12 bg-gray-50 dark:bg-white min-h-screen">
      <Container>
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-black">
          Create a New Post
        </h1>

        {/* Main form container */}
        <div className="max-w-4xl mx-auto bg-white dark:bg-black p-6 rounded-xl shadow-md">
          <div className="flex flex-col gap-6">
            {/* Slug field and Create button in one row */}
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Enter slug here"
                className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-800 
                           focus:ring-2 focus:ring-white outline-none dark:bg-gray-700 
                           dark:text-white"
              />
              <button
                type="button"
                className="px-5 py-2 dark:bg-gray-700 text-white rounded-lg shadow-md 
                           hover:bg-white hover:text-black transition"
              >
                Create Post
              </button>
            </div>

            {/* Rich Text Editor and other form parts */}
            <PostForm />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default AddPost;
