import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Container } from "../components";
import DOMPurify from "dompurify";
import { useSelector } from "react-redux";

export default function Post() {
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams();
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const isAuthor = post && userData ? post.userId === userData.$id : false;

  useEffect(() => {
    const fetchPost = async () => {
      if (!slug) {
        navigate("/");
        return;
      }

      try {
        const fetchedPost = await appwriteService.getPost(slug);
        if (fetchedPost) setPost(fetchedPost);
        else navigate("/");
      } catch (err) {
        console.error("Failed to fetch post:", err);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug, navigate]);

  const deletePost = async () => {
    if (!post) return;
    try {
      const status = await appwriteService.deletePost(post.$id);
      if (status) {
        if (post.featuredImage) await appwriteService.deleteFile(post.featuredImage);
        navigate("/");
      }
    } catch (err) {
      console.error("Failed to delete post:", err);
    }
  };

  if (loading)
    return (
      <div className="py-16 text-center text-gray-600 dark:text-gray-300">
        Loading...
      </div>
    );

  if (!post) return null;

  return (
    <div className="min-h-screen py-10 bg-gray-50 dark:bg-black">
      <Container>
        <div className="max-w-3xl mx-auto w-full">
          {/* Top Info Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">

            {/* Status + Author */}
            <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-gray-800 dark:text-white text-base font-semibold">
              <span>Status: {post.status || "Active"}</span>
              <span>Author: {userData?.name || "Unknown"}</span>
            </div>

            {/* Edit/Delete Buttons */}
            {isAuthor && (
              <div className="flex gap-3">
                <Link to={`/edit-post/${post.$id}`}>
                  <button
                    className="bg-black text-white px-4 py-2 rounded-md shadow-md 
                               hover:bg-white hover:text-black hover:scale-105 transform transition duration-150"
                  >
                    Edit
                  </button>
                </Link>

                <button
                  onClick={deletePost}
                  className="bg-black text-white px-4 py-2 rounded-md shadow-md 
                             hover:bg-white hover:text-black hover:scale-105 transform transition duration-150"
                >
                  Delete
                </button>
              </div>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-white leading-tight mb-6">
            {post.title}
          </h1>

          {/* Featured Image */}
          {post.featuredImage && (
            <div className="rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-md mb-8">
              <img
                src={appwriteService.getFileView(post.featuredImage)}
                alt={post.title}
                className="w-full max-h-[400px] object-cover sm:object-contain transition-transform duration-300 hover:scale-105"
              />
            </div>
          )}

          {/* Description (optional) */}
          {post.description && (
            <section
              className="text-lg text-gray-700 dark:text-gray-200 mb-6 leading-relaxed"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.description),
              }}
            />
          )}

          {/* Content */}
          <article
            className="prose prose-lg dark:prose-invert max-w-none text-gray-800 dark:text-gray-200 leading-relaxed break-words"
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(
                post.content || "<p>No content available.</p>"
              ),
            }}
          />
        </div>
      </Container>
    </div>
  );
}
