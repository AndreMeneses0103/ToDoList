import { useState } from "react";

export default function LoginBox() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="min-h-screen flex items-center justify-center overflow-hidden">
            <div className="flex flex-col w-80 bg-gray-900 rounded-lg">
                <span className="text-2xl font-bold mt-5 text-center">
                    Sign In
                </span>

                <input
                    type="text"
                    placeholder="Email"
                    className="m-5 bg-gray-950 rounded p-2 outline-none"
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="m-5 bg-gray-950 rounded p-2 outline-none"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button className="bg-gray-700 w-40 h-10 m-auto mb-5 rounded hover:bg-gray-600">
                    Login
                </button>
            </div>
        </div>
    )
}
