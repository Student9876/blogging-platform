"use client";
import { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";

export default function CreatePost() {
    const [form, setForm] = useState({ title: "", content: "" });
    const { user } = useContext(AuthContext);
    const router = useRouter();

    const submitPost = async () => {
        await axios.post("http://localhost:5000/api/posts", form, {
            headers: { Authorization: `Bearer ${user.token}` },
        });
        router.push("/");
    };

    return (
        <div className="p-6 max-w-xl mx-auto space-y-4">
            <h1 className="text-2xl font-bold">Create Blog Post</h1>
            <input type="text" placeholder="Title" className="w-full border p-2" onChange={(e) => setForm({ ...form, title: e.target.value })} />
            <textarea placeholder="Content" className="w-full border p-2 h-40" onChange={(e) => setForm({ ...form, content: e.target.value })} />
            <button className="bg-black text-white px-4 py-2" onClick={submitPost}>
                Publish
            </button>
        </div>
    );
}
