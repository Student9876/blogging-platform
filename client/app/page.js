"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import Link from "next/link";

export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/api/posts").then((res) => setPosts(res.data));
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold">All Blog Posts</h1>
      {posts.map((post) => (
        <Link key={post._id} href={`/posts/${post._id}`} className="block border p-4 rounded hover:bg-gray-50">
          <h2 className="text-xl font-semibold">{post.title}</h2>
          <p className="text-sm text-gray-600">By {post.author.username}</p>
        </Link>
      ))}
    </div>
  );
}
