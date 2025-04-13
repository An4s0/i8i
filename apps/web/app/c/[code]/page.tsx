'use client';
import { useState } from "react";
import { Lock } from "@/components/icons";

export default function Shorten() {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    return (
        <main className="flex flex-col items-center justify-center h-[calc(100vh-5rem)]">
            <span className="text-5xl font-bold text-primary">
                Protected Link
            </span>
            <p className="mt-4 text-lg text-center text-subtle">
                This link is protected by a password. Please enter the password to access the link.
            </p>
            {error && (
                <p className="mt-2 text-lg text-center text-red-500 font-semibold">
                    {error}
                </p>
            )}
            <div className="flex flex-col items-center justify-center w-full max-w-2xl mt-8">
                <div className="w-full p-4 rounded-lg shadow-md">
                    <div className="w-full h-12 p-2 rounded-lg bg-primary/10 flex items-center gap-3">
                        <Lock size={30} className="text-primary/80" />
                        <input
                            type="password"
                            placeholder="Enter password to access the link"
                            className="w-full h-full focus:outline-none text-lg"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="px-4 py-2 text-sm font-semibold text-white bg-primary rounded-lg cursor-pointer hover:bg-primary/80"

                        >
                            Visit
                        </button>
                    </div>


                </div>

            </div>
        </main>
    )
}