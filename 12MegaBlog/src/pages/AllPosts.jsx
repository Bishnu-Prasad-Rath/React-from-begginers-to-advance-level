import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";

export default function AllPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await appwriteService.getPosts();
        if (res && res.documents) setPosts(res.documents);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="py-8">
      <Container>
        <h1 className="text-3xl font-bold mb-8">ALL POSTS</h1>

        {loading ? (
          <div className="text-center py-12">Loading posts...</div>
        ) : posts.length ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <PostCard key={post.$id} post={post} />
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-12">No posts available.</div>
        )}
      </Container>
    </div>
  );
}
