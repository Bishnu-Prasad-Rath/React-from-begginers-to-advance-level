import React from "react";
import { Link } from "react-router-dom";
import appwriteService from "../appwrite/config";
import DOMPurify from "dompurify";

export default function PostCard({ post }) {
  if (!post) return null;

  return (
    <div className="
      group border border-gray-200 dark:border-gray-700 
      rounded-xl overflow-hidden shadow-sm hover:shadow-lg 
      transition-all duration-300 bg-white dark:bg-black 
      flex flex-col w-full
    ">
      
      {/* Featured Image */}
      {post.featuredImage && (
        <div className="relative overflow-hidden w-full">
          <img
            src={appwriteService.getFileView(post.featuredImage)}
            alt={post.title}
            className="
              w-full h-48 sm:h-56 md:h-64 object-cover 
              transition-transform duration-300 group-hover:scale-105
            "
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>
      )}

      {/* Content Area */}
      <div className="p-5 sm:p-6 flex flex-col flex-1">

        {/* Meta Info */}
        <div className="flex flex-wrap items-center text-sm text-gray-500 dark:text-gray-400 mb-3 gap-2">
          <span>{new Date(post.$createdAt).toLocaleDateString()}</span>
          
          {post.tags && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag, i) => (
                <span
                  key={i}
                  className="
                    px-2 py-0.5 bg-blue-100 text-blue-600 
                    dark:bg-blue-900/30 dark:text-blue-300 
                    text-xs rounded-full
                  "
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Title */}
        <h2 className="
          text-xl sm:text-2xl font-semibold mb-3 
          text-gray-900 dark:text-white leading-snug 
          group-hover:text-blue-600 dark:group-hover:text-gray-200 
          transition-colors duration-200
        ">
          {post.title}
        </h2>

        {/* Excerpt */}
        <div
          className="
            text-gray-600 dark:text-gray-300 
            flex-1 overflow-hidden text-sm sm:text-base
          "
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(
              post.content
                ? post.content.length > 140
                  ? post.content.substring(0, 140) + "..."
                  : post.content
                : "No content available."
            ),
          }}
        ></div>

        {/* Read More */}
        <div className="mt-5">
          <Link
            to={`/post/${post.$id}`}
            className="
              inline-block px-5 py-2.5 bg-white text-black 
              text-sm font-medium rounded-lg shadow-md 
              hover:bg-gray-700 hover:text-white hover:shadow-lg 
              transform hover:-translate-y-0.5 transition-all duration-200
            "
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
}
