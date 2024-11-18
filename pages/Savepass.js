import { useState } from "react";
import { useRouter } from "next/router";

export default function SavePassword() {
  const [appName, setAppName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleSavePassword = async (e) => {
    e.preventDefault();
    if (!password || !appName || !username) {
      setError("All fields are required.");
      return;
    }

    try {
      // Send data to the API route to save to MongoDB
      const res = await fetch("/api/savepass", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ appName, username, password }),
      });

      if (!res.ok) {
        throw new Error("Failed to save password.");
      }

      // If successful, redirect to the dashboard
      router.push("/dashboard");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-indigo-900 p-6 flex flex-col items-center justify-center">
      <div className="max-w-lg mx-auto bg-gray-800 text-white p-8 rounded-lg shadow-lg w-full">
        <h1 className="text-4xl font-bold text-green-400 text-center mb-6">Save Password</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSavePassword} className="space-y-6">
          <input
            type="text"
            placeholder="Enter app name"
            value={appName}
            onChange={(e) => setAppName(e.target.value)}
            required
            className="w-full p-3 bg-transparent border-b-2 border-green-400 text-white focus:outline-none placeholder-gray-400"
          />

          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 bg-transparent border-b-2 border-green-400 text-white focus:outline-none placeholder-gray-400"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 bg-transparent border-b-2 border-green-400 text-white focus:outline-none placeholder-gray-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-400 transition duration-300"
          >
            Save Password
          </button>
        </form>
      </div>
    </div>
  );
}
