import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";

function Navbar() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <Link to="/" className="text-xl font-bold text-blue-600">
        SwapMarket
      </Link>

      <div className="flex items-center gap-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">
          Listings
        </Link>

        {currentUser ? (
          <>
            <Link to="/dashboard" className="text-gray-700 hover:text-blue-600">
              Dashboard
            </Link>
            <Link to="/admin" className="text-gray-700 hover:text-blue-600">
              Admin
            </Link>
            <span className="text-sm text-gray-500">Hi, {currentUser.name}</span>
            <button
              onClick={handleLogout}
              className="px-3 py-1 rounded bg-red-500 text-white hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;