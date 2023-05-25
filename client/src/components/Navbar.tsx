import { FC } from "react";
import { UserType } from "../types";
import { Link } from "react-router-dom";

const Navbar: FC<{ isAuthenticated: boolean; user?: UserType }> = ({
  isAuthenticated,
  user,
}) => {
  const handleLogout = () => {};
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        {!isAuthenticated || !user ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/signin">Signin</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <img src={user.image} alt="User" />
            </li>
            <li>
              <span>{user.name}</span>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
