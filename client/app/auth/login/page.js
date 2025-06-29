"use client";
import { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/contexts/AuthContext";

export default function Login() {
    const [form, setForm] = useState({ username: "", password: "" });
    const { login } = useContext(AuthContext);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("Logging in with:", form); 
        const res = await axios.post("http://localhost:5000/api/auth/login", form);
        login(res.data);
        router.push("/");
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h1 className="text-2xl font-bold mb-4">Login</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
                <input type="text" placeholder="Username" className="w-full border p-2" onChange={(e) => setForm({ ...form, username: e.target.value })} />
                <input type="password" placeholder="Password" className="w-full border p-2" onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <button className="bg-black text-white px-4 py-2 rounded">Login</button>
            </form>
        </div>
    );
}
