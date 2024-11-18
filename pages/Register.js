import { useState } from "react";
import { useRouter } from "next/router";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // To prevent multiple submissions
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; // Prevent multiple submissions

    setIsSubmitting(true);

    if (!email || !password || !username) {
      setError("All fields are required.");
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, username }),
      });

      const data = await res.json();
      if (res.status === 201) {
        router.push("/login"); // Redirect to login after successful registration
      } else {
        setError(data.message); // Show error from backend
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLoginRedirect = () => {
    router.push("/Login");
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500 to-pink-600 p-6 flex flex-col items-center justify-center">
      <div className="max-w-md mx-auto bg-gradient-to-r from-black to-gray-800 text-white p-8 rounded-xl shadow-xl">
        <h1 className="text-4xl text-center font-bold text-white mb-6">Register</h1>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleRegister} className="space-y-6">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-4 bg-transparent border-2 border-white text-white focus:outline-none focus:border-pink-400 rounded-lg shadow-md placeholder-gray-300"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-4 bg-transparent border-2 border-white text-white focus:outline-none focus:border-pink-400 rounded-lg shadow-md placeholder-gray-300"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-4 bg-transparent border-2 border-white text-white focus:outline-none focus:border-pink-400 rounded-lg shadow-md placeholder-gray-300"
          />
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-pink-500 text-white p-4 rounded-lg hover:bg-pink-600 transition duration-300"
          >
            Register
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-400">
            Already have an account?{" "}
            <button
              onClick={handleLoginRedirect}
              className="text-pink-500 hover:text-pink-400 focus:outline-none"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
