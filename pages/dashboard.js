import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [savedPasswords, setSavedPasswords] = useState([]);
  const router = useRouter();
  const [isSessionActive, setSessionActive] = useState(true);
  const sessionTimeout = useRef(null);

  useEffect(() => {
    const fetchUserAndPasswords = async () => {
      try {
        // Fetch user from the server
        const userResponse = await fetch("/api/user");
        if (!userResponse.ok) {
          throw new Error("User not authenticated");
        }
        const userData = await userResponse.json();
        setUser(userData);

        // Fetch passwords for the user
        const passwordResponse = await fetch("/api/pass");
        if (passwordResponse.ok) {
          const passwordData = await passwordResponse.json();
          setSavedPasswords(passwordData);
        } else {
          console.error("Failed to fetch passwords");
        }
      } catch (error) {
        console.error("Error fetching user or passwords:", error);
        router.push("/login"); // Redirect to login if user is not authenticated
      }
    };

    fetchUserAndPasswords();

    const handleActivity = () => {
      setSessionActive(true);
      clearTimeout(sessionTimeout.current);
      startSessionTimeout();
    };

    const startSessionTimeout = () => {
      sessionTimeout.current = setTimeout(() => {
        setSessionActive(false);
        router.push("/Login");
      }, 5 * 60 * 1000); // 5 minutes timeout
    };

    startSessionTimeout();
    document.addEventListener("mousemove", handleActivity);
    document.addEventListener("keydown", handleActivity);

    return () => {
      document.removeEventListener("mousemove", handleActivity);
      document.removeEventListener("keydown", handleActivity);
      clearTimeout(sessionTimeout.current);
    };
  }, [router]);

  const handleLogout = async () => {
    try {
      await fetch("/api/logout", { method: "POST" });
      router.push("/Login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  const handleRemovePassword = async (passwordToRemove) => {
    try {
      await fetch(`/api/passwords/${passwordToRemove._id}`, { method: "DELETE" });
      setSavedPasswords((prevPasswords) =>
        prevPasswords.filter((password) => password._id !== passwordToRemove._id)
      );
    } catch (error) {
      console.error("Error removing password:", error);
    }
  };

  return (
    user && (
      <div className="min-h-screen bg-gradient-to-r from-blue-600 via-blue-500 to-blue-400 text-white p-6 sm:p-8 flex flex-col md:flex-row">
        <div className="w-full md:w-1/4 bg-gradient-to-b from-blue-700 via-blue-600 to-blue-500 text-white py-8 px-6 flex flex-col justify-between rounded-lg shadow-lg mb-6 md:mb-0">
          <div>
            <h2 className="text-4xl font-semibold text-center text-green-400 mb-6 tracking-wide">Dashboard</h2>
            <p className="text-xl text-center text-blue-200 mb-8">{user.username}</p>

            <button
              onClick={() => router.push("Savepass")}
              className="w-full bg-green-500 text-white py-3 rounded-lg shadow-md hover:bg-green-400 transition duration-200 mb-4"
            >
              Save Password
            </button>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-3 rounded-lg hover:bg-red-400 transition duration-200 mt-auto shadow-lg"
          >
            LOGOUT
          </button>
        </div>

        <div className="w-full md:w-3/4 bg-blue-900 text-white py-8 px-10 rounded-lg shadow-xl">
          {!isSessionActive && (
            <div className="text-white font-bold text-center p-4 bg-red-500 rounded-lg w-full max-w-md mt-6 shadow-xl transform transition duration-300 hover:scale-105">
              Session expired. Please log in again.
            </div>
          )}

          <h1 className="text-3xl sm:text-4xl md:text-5xl text-green-400 font-bold mb-6">
            Welcome, <span className="text-blue-300">{user.username}</span>
          </h1>

          <h2 className="text-xl sm:text-2xl text-blue-200 mb-4">Saved Passwords</h2>
          <ul className="space-y-4 mb-6">
            {savedPasswords.length > 0 ? (
              savedPasswords.map((passwordObj) => (
                <li
                  key={passwordObj._id}
                  className="p-4 bg-blue-800 text-green-400 rounded-lg shadow-lg hover:scale-105 transform transition duration-300 flex justify-between items-center"
                >
                  <span>{passwordObj.appName} - {passwordObj.username}</span>
                  <button
                    onClick={() => handleRemovePassword(passwordObj)}
                    className="text-red-500 hover:text-red-400 transition duration-200"
                  >
                    Remove
                  </button>
                </li>
              ))
            ) : (
              <li className="text-center text-blue-300">No saved passwords yet.</li>
            )}
          </ul>
        </div>
      </div>
    )
  );
}
