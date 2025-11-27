import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
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

  if (loading) return <div className="py-8 text-center text-gray-500">Loading...</div>;
  if (!post) return null;

return (
  <div className="min-h-screen bg-grey-900 dark:bg-white py-16">
    <Container>
      <div className="max-w-3xl mx-auto">
        {/* Sidebar details ABOVE main title */}
        <div className="flex flex-col md:flex-row md:items-center mb-6 md:mb-8">
          <div className="md:mr-8 flex gap-8 text-black dark:text-black text-lg font-semibold">
            <span>Status: {post.status || "Active"}</span>
            <span>Author: {userData?.name || "Unknown"}</span>
          </div>
          {isAuthor && (
            <div className="flex gap-4 mt-4 md:mt-0">
  <Link to={`/edit-post/${post.$id}`}>
    <button
      className="bg-black text-white px-4 py-2 rounded-md shadow-md 
                 hover:bg-white hover:text-black hover:scale-105 transform transition-transform duration-150"
      aria-label="Edit Post"
    >
      Edit
    </button>
  </Link>
  <button
    onClick={deletePost}
    className="bg-black text-white px-4 py-2 rounded-md shadow-md 
               hover:bg-white hover:text-black hover:scale-105 transform transition-transform duration-150"
    aria-label="Delete Post"
  >
    Delete
  </button>
</div>

          )}
        </div>

        <h1 className="text-4xl font-extrabold text-gray-900 dark:text-black leading-tight mb-6">
          {post.title}
        </h1>

        {post.featuredImage && (
          <div className="rounded-3xl border border-gray-200 dark:border-gray-700 shadow-lg mb-8 overflow-hidden">
            <img
              src={appwriteService.getFileView(post.featuredImage)}
              alt={post.title}
              className="w-full max-h-[500px] object-contain transition-transform duration-300 hover:scale-105"
            />
          </div>
        )}

        {post.description && (
          <section
            className="text-lg mb-6"
            dangerouslySetInnerHTML={{ __html: post.description }}
          />
        )}

        <article
          className="prose prose-lg dark:prose-invert max-w-none text-gray-800 dark:text-black break-words"
          dangerouslySetInnerHTML={{ __html: post.content || "<p>No content available.</p>" }}
        />
      </div>
    </Container>
  </div>
);


}
