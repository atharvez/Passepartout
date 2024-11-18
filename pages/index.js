import { useEffect, useState } from "react";

export default function UserList() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("/api/user");
        const data = await res.json();

        if (res.status === 200) {
          setUsers(data.users);
        } else {
          setError("Error fetching users.");
        }
      } catch (error) {
        setError("Something went wrong.");
      }
    };

    fetchUsers();
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center text-red-500 text-xl font-semibold">{error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 to-indigo-900 p-6 flex flex-col items-center justify-center">
      <div className="max-w-3xl w-full bg-black text-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-bold text-center mb-8 text-indigo-300">User List</h1>

        <div className="space-y-6">
          {users.length > 0 ? (
            users.map((user, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-800 p-4 rounded-lg shadow-md hover:bg-gray-700 transition"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white">
                  {/* Check if username exists and is not empty */}
                  <span className="font-bold text-xl">
                    {user.username && user.username.length > 0 ? user.username[0] : "?"}
                  </span>
                </div>
                <div className="ml-4">
                  <p className="text-xl font-semibold">{user.username || "Unknown User"}</p>
                  <p className="text-sm text-gray-400">{user.email || "No email available"}</p>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-gray-300">No users found.</div>
          )}
        </div>
      </div>
    </div>
  );
}
