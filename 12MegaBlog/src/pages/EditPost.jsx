import React, { useEffect, useState } from "react";
import { Container, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";

function EditPost() {
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

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
      }
    };

    fetchPost();
  }, [slug, navigate]);

  if (!post) return <div className="py-12 text-center text-gray-600">Loading post...</div>;

  return (
    <div className="py-12 bg-gray-50 dark:bg-white min-h-screen">
      <Container>
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-black">
          Edit Post
        </h1>
        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-md">
          <PostForm post={post} />
        </div>
      </Container>
    </div>
  );
}

export default EditPost;
