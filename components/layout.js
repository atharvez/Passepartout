import Link from "next/link";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-800 via-purple-600 to-blue-700 text-white font-sans">
      <header className="border-b border-hackerAccent p-6 flex justify-between items-center bg-gradient-to-b from-blue-800 to-indigo-800 shadow-lg">
        {/* Logo Section */}
        <div className="flex items-center space-x-4">
          <img
            src="/path/to/your/logo.png" // Replace with the actual logo path
            alt="Passepartout Logo"
            className="h-10 w-auto rounded-md shadow-lg"
          />
          <h1 className="text-3xl font-bold text-hackerText tracking-tight">PassePartout</h1>
        </div>

        {/* Navigation Links */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/Login">
            <span className="hover:underline text-lg text-hackerAccent font-semibold transition duration-300">Login</span>
          </Link>
          <Link href="/Register">
            <span className="hover:underline text-lg text-hackerAccent font-semibold transition duration-300">Register</span>
          </Link>
        </nav>

        {/* Mobile Menu */}
        <div className="md:hidden flex items-center">
          <Link href="/Login">
            <span className="text-hackerAccent">Login</span>
          </Link>
          <Link href="/Register">
            <span className="ml-4 text-hackerAccent">Register</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6 lg:p-8">{children}</main>

      {/* Footer */}
      <footer className="border-t border-hackerAccent p-4 text-center bg-gradient-to-t from-blue-700 to-indigo-800 text-hackerText">
        <p>&copy; {new Date().getFullYear()} Passepartout | All Rights Reserved</p>
      </footer>
    </div>
  );
}
