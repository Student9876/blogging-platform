"use client";
import Link from "next/link";
import { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);
    const router = useRouter();

    const handleLogout = () => {
        logout();
        router.push("/");
    };

    return (
        <nav className="flex items-center justify-between p-4 bg-black text-white">
            <Link href="/" className="text-xl font-bold">MyBlog</Link>
            <div className="space-x-4">
                <Link href="/" className="hover:underline">Home</Link>
                {user && <Link href="/posts/create" className="hover:underline">Create</Link>}
                {!user ? (
                    <>
                        <Link href="/auth/login" className="hover:underline">Login</Link>
                        <Link href="/auth/register" className="hover:underline">Register</Link>
                    </>
                ) : (
                    <button onClick={handleLogout} className="hover:underline">Logout</button>
                )}
            </div>
        </nav>
    );
}
