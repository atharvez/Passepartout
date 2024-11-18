import { useState } from "react";
import { useRouter } from "next/router";

export default function SetPassword() {
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSave = async (e) => {
    e.preventDefault();
    // You would save the password here (e.g., API call to backend)
    setMessage("Password saved successfully!");
  };

  return (
    <div className="p-6 rounded border border-hackerAccent shadow-lg w-full max-w-md mx-auto mt-8 bg-hackerBg">
      <h1 className="text-hackerText text-3xl font-bold mb-4">Set Spotify Password</h1>
      {message && <p className="text-green-500">{message}</p>}
      <form onSubmit={handleSave}>
        <input
          type="password"
          placeholder="Enter password"
          className="w-full p-3 mb-4 bg-transparent border-b-2 border-hackerAccent text-hackerWhite font-hacker focus:outline-none"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-hackerAccent text-hackerBg p-3 rounded font-hacker hover:bg-hackerText hover:text-hackerBg transition"
        >
          SAVE PASSWORD
        </button>
      </form>
    </div>
  );
}
