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
        if (res?.documents) setPosts(res.documents);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="py-10 min-h-screen bg-white dark:bg-black">
      <Container>
        
        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold mb-10 text-center text-gray-900 dark:text-white">
          ALL POSTS
        </h1>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-20 text-gray-600 dark:text-gray-300 text-lg">
            Loading posts...
          </div>
        )}

        {/* No Posts */}
        {!loading && posts.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-20 text-lg">
            No posts available.
          </div>
        )}

        {/* Posts Grid */}
        {!loading && posts.length > 0 && (
          <div
            className="
              grid w-full gap-6
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-3
              2xl:grid-cols-4
              justify-items-center
            "
          >
            {posts.map((post) => (
              <div key={post.$id} className="w-full max-w-[380px]">
                <PostCard post={post} />
              </div>
            ))}
          </div>
        )}

      </Container>
    </div>
  );
}
