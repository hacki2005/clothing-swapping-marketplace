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
    <nav
      aria-label="Main navigation"
      className="flex items-center justify-between px-8 py-5 bg-white/80 backdrop-blur-md shadow-sm sticky top-0 z-50"
    >
      <Link to="/" className="font-['Fraunces'] text-2xl font-semibold text-[#23231F] tracking-tight">
        Re:Wear
      </Link>

      <div className="flex items-center gap-7 text-sm font-medium">
        <Link to="/" className="text-[#3D4A34] hover:text-[#23231F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#B5592F] rounded-full px-2 py-1">
          Browse
        </Link>

        {currentUser ? (
          <>
            <Link to="/dashboard" className="text-[#3D4A34] hover:text-[#23231F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#B5592F] rounded-full px-2 py-1">
              Dashboard
            </Link>
            <Link to="/admin" className="text-[#3D4A34] hover:text-[#23231F] transition-colors focus:outline-none focus:ring-2 focus:ring-[#B5592F] rounded-full px-2 py-1">
              Admin
            </Link>
            <span className="text-[#7A7264]">{currentUser.name}</span>
            <button
              onClick={handleLogout}
              className="shine-btn px-4 py-2 min-h-[44px] rounded-full bg-[#23231F] text-[#F6F1E4] shadow-sm hover:shadow-md hover:bg-[#3D4A34] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B5592F] transition-all"
            >
              Log out
            </button>
          </>
        ) : (
          <Link
            to="/login"
            className="shine-btn px-4 py-2 min-h-[44px] rounded-full bg-[#B5592F] text-[#F6F1E4] shadow-sm hover:shadow-md hover:bg-[#9c4a26] transition-all inline-flex items-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#B5592F]"
          >
            Log in
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;