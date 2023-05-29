import { FC } from "react";
import { UserType } from "../types";
import { Link } from "react-router-dom";

const Navbar: FC<{ isAuthenticated: boolean; user?: UserType }> = ({
  isAuthenticated,
  user,
}) => {
  const handleLogout = () => {};

  return (
    <nav className="bg-primary-blue py-4 px-6 fixed top-0 w-full">
      <ul className="flex items-center justify-between">
        <li>
          <Link to="/" className="text-white text-lg font-bold">
            Home
          </Link>
        </li>
        {!isAuthenticated || !user ? (
          <ul className="flex items-center space-x-4">
            <li>
              <Link
                to="/login"
                className="text-white hover:text-soft-white transition-colors duration-300"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                className="text-white hover:text-soft-white transition-colors duration-300"
              >
                Register
              </Link>
            </li>
          </ul>
        ) : (
          <ul className="flex items-center space-x-4">
            <li>
              <img
                src={user.image}
                alt="User"
                className="w-8 h-8 rounded-full"
              />
            </li>
            <li>
              <span className="text-white">{user.name}</span>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="text-white hover:text-light-red transition-colors duration-300"
              >
                Logout
              </button>
            </li>
          </ul>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
