import { useState } from "react";

export default function LoginBox() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div>
            <span>Sign In</span>
            <input 
                type="text" 
                placeholder="Email"
                onChange={(e)=> setEmail(e.target.value)} 
            />
            <input 
                type="password" 
                placeholder="Password" 
                onChange={(e)=> setPassword(e.target.value)}
            />
            <button>Login</button>
        </div>
    )
}
