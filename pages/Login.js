// pages/login.js
import { useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Both fields are required.");
      return;
    }

    setLoading(true); // Set loading state to true before sending the request

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.status === 200) {
        router.push("/dashboard");
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false); // Reset loading state after the request is complete
    }
  };

  const handleRegisterRedirect = () => {
    router.push("/Register"); // Redirect to the register page
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-indigo-900 p-6 flex flex-col items-center justify-center">
      <div className="max-w-sm mx-auto bg-black text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl text-center font-bold mb-6">Login</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 bg-transparent border-2 border-white text-white focus:outline-none focus:border-indigo-500 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 bg-transparent border-2 border-white text-white focus:outline-none focus:border-indigo-500 rounded"
          />
          <button
            type="submit"
            disabled={loading} // Disable the button while loading
            className="w-full bg-indigo-500 text-white p-3 rounded hover:bg-indigo-600 transition disabled:bg-indigo-300"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <p className="text-sm text-gray-300">
            Don't have an account?{" "}
            <button
              onClick={handleRegisterRedirect} // Using button for registration redirection
              className="text-indigo-500 hover:text-white"
            >
              Register here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
