"use client";
import { useEffect, useState, useContext } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import { AuthContext } from "@/contexts/AuthContext";

export default function PostPage() {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState("");
    const { user } = useContext(AuthContext);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/posts/${id}`).then((res) => setPost(res.data));
    }, [id]);

    const submitComment = async () => {
        if (!comment.trim()) return;
        await axios.post(
            `http://localhost:5000/api/posts/${id}/comment`,
            { text: comment },
            { headers: { Authorization: `Bearer ${user.token}` } }
        );
        setComment(""); // clear textarea
        const res = await axios.get(`http://localhost:5000/api/posts/${id}`);
        setPost(res.data); // refresh comments without reloading the page
    };

    return post ? (
        <div className="p-6 max-w-3xl mx-auto space-y-6">
            <div>
                <h1 className="text-2xl font-bold">{post.title}</h1>
                <p className="text-sm text-gray-600 mb-2">By {post.author.username}</p>
                <p>{post.content}</p>
            </div>

            <div>
                <h2 className="text-xl font-semibold">Comments</h2>
                {post.comments.length === 0 ? (
                    <p className="text-gray-500 mt-2">No comments yet.</p>
                ) : (
                    <ul className="mt-4 space-y-3">
                        {post.comments.map((c, i) => (
                            <li key={i} className="bg-gray-100 p-3 rounded-md">
                                <p className="text-gray-800">{c.text}</p>
                                <div className="text-xs text-gray-500 mt-1">
                                    — {c.username || "Anonymous"} on{" "}
                                    {new Date(c.createdAt).toLocaleString()}
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {user && (
                <div className="mt-6 space-y-2">
                    <textarea
                        className="w-full border p-2 rounded-md"
                        rows="3"
                        placeholder="Write a comment..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                    <button
                        className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
                        onClick={submitComment}
                    >
                        Add Comment
                    </button>
                </div>
            )}
        </div>
    ) : (
        <p className="p-4">Loading...</p>
    );
}
