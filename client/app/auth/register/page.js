"use client";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function Register() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post("http://localhost:5000/api/auth/register", form);
        router.push("/auth/login");
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Register</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" className="w-full border p-2" onChange={(e) => setForm({ ...form, username: e.target.value })} />
                <input type="email" placeholder="Email" className="w-full border p-2" onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <input type="password" placeholder="Password" className="w-full border p-2" onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button className="bg-black text-white px-4 py-2 rounded">Register</button>
            </form>
        </div>
    );
}
