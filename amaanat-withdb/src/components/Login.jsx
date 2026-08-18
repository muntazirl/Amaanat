import { useState } from 'react';
import { toast } from 'react-toastify';

const API = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Login = ({ onAuth }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = async () => {
    const route = isSignup ? "/signup" : "/login";
    const res = await fetch(`${API}${route}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (!res.ok) return toast(data.error || "Something went wrong");

    // both signup and login now return a token → log in directly
    localStorage.setItem("token", data.token);   // save the JWT
    if (isSignup) toast("Account created!");
    onAuth();                                     // tell App we're logged in
  };

  return (
    <div className="flex flex-col items-center gap-4 p-10 max-w-sm mx-auto">
      <h1 className="text-2xl font-bold text-green-700">
        {isSignup ? "Create Account" : "Login"}
      </h1>
      <input className="border border-green-400 rounded-full px-4 w-full" placeholder="Email"
        value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" className="border border-green-400 rounded-full px-4 w-full" placeholder="Password"
        value={password} onChange={e => setPassword(e.target.value)} />
      <button onClick={submit} className="bg-green-500 rounded-full px-6 py-2 cursor-pointer">
        {isSignup ? "Sign Up" : "Login"}
      </button>
      <p className="cursor-pointer text-sm" onClick={() => setIsSignup(!isSignup)}>
        {isSignup ? "Already have an account? Login" : "New here? Create account"}
      </p>
    </div>
  );
};

export default Login;