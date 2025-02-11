import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";
import { toast } from "react-toastify";
import { AuthContext } from "../providers/AuthProvider";
import logo from "../assets/images/logo.webp";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleLogOut = () => {
    logOut();
    toast.success("Successfully logged out!", {
      position: toast.POSITION.TOP_RIGHT,
      autoClose: 3000,
    });
  };

  return (
    <nav className="w-full fixed top-0 z-50 bg-white bg-opacity-80 backdrop-blur-md shadow-md">
      <div className="container mx-auto px-6 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img className="w-auto h-8" src={logo} alt="ClaimFinder logo" />
          <span className="text-2xl font-bold text-gray-800">ClaimFinder</span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-lg font-medium">
          <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
          <li><Link to="/allItems" className="hover:text-blue-600">Lost & Found</Link></li>
          <li><Link to="/about" className="hover:text-blue-600">About</Link></li>
          {!user && <li><Link to="/login" className="hover:text-blue-600">Login</Link></li>}
        </ul>

        {/* User Dropdown or Login */}
        <div className="hidden md:flex items-center gap-4">
          {user ? (
            <div className="relative group">
              <div
                className="cursor-pointer w-10 h-10 rounded-full overflow-hidden border-2 border-gray-300"
                title={user?.displayName}
              >
                <img referrerPolicy="no-referrer" src={user?.photoURL} alt="User Profile" />
              </div>
              <ul className="absolute right-0 mt-3 w-48 bg-white shadow-md rounded-md p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                <li><Link to="/addItems" className="block py-2 px-3 hover:bg-gray-100">Add Lost & Found Item</Link></li>
                <li><Link to="/allRecovered" className="block py-2 px-3 hover:bg-gray-100">All Recovered Items</Link></li>
                <li><Link to="/myItems" className="block py-2 px-3 hover:bg-gray-100">Manage My Item</Link></li>
                <li className="mt-2">
                  <button
                    onClick={handleLogOut}
                    className="w-full text-center bg-gray-200 py-2 rounded-md hover:bg-gray-300 transition"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <Link to="/login" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">Login</Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-md">
          <ul className="flex flex-col items-center text-lg font-medium py-4 space-y-3">
            <li><Link to="/" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>Home</Link></li>
            <li><Link to="/allItems" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>Lost & Found</Link></li>
            <li><Link to="/about" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>About</Link></li>
            {!user && <li><Link to="/login" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>Login</Link></li>}

            {user && (
              <>
                <li><Link to="/addItems" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>Add Item</Link></li>
                <li><Link to="/allRecovered" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>Recovered Items</Link></li>
                <li><Link to="/myItems" className="hover:text-blue-600" onClick={() => setIsOpen(false)}>My Items</Link></li>
                <li className="mt-2">
                  <button onClick={handleLogOut} className="w-full bg-gray-200 py-2 rounded-md hover:bg-gray-300">
                    Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
