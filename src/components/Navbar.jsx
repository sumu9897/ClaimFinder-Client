import { useContext } from "react";
import logo from "../assets/images/logo.webp";
import { AuthContext } from "../providers/AuthProvider";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  return (
    <nav className="w-full fixed top-0 z-30  bg-opacity-70 backdrop-blur-md shadow-md">
      <div className="flex container px-6 py-2 mx-auto items-center">
        <div className="flex-1">
          <Link to="/" className="flex gap-2 items-center">
            <img className="w-auto h-7" src={logo} alt="" />
            <span className="font-bold text-2xl">ClaimFinder</span>
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1 text-xl">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/allItems">Lost & Found</Link>
            </li>

            <li>
              <Link to='/about'>About</Link>
            </li>

            {!user && (
              <li>
                <Link to="/login">Login</Link>
              </li>
            )}
          </ul>

          {user && (
            <div className="dropdown dropdown-end z-50">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar"
              >
                <div title={user?.displayName} className="w-10 rounded-full">
                  <img
                    referrerPolicy="no-referrer"
                    alt="User Profile Photo"
                    src={user?.photoURL}
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link to="/addItems" className="justify-between">
                    Add Lost & Found Item
                  </Link>
                </li>
                <li>
                  <Link to="/allRecovered">All Recovered Items</Link>
                </li>
                <li>
                  <Link to="/myItems">Manage My Item</Link>
                </li>
                <li className="mt-2">
                  <button
                    onClick={logOut}
                    className="bg-gray-200 block text-center"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
