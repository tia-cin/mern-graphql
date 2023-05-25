import { FC } from "react";
import { Link } from "react-router-dom";

const Landing: FC = () => (
  <div className="bg-pale-blue min-h-screen flex flex-col justify-center items-center">
    <h1 className="text-4xl font-bold text-primary-blue mb-8">
      Task Management
    </h1>
    <p className="text-lg text-gray-800 mb-12">
      Manage your tasks efficiently with our platform
    </p>
    <div className="flex space-x-4">
      <Link to="/signin">
        <button className="bg-primary-blue text-soft-white px-4 py-2 rounded-md hover:bg-dark-blue">
          Sign In
        </button>
      </Link>
      <Link to="/login">
        <button className="bg-primary-blue text-soft-white px-4 py-2 rounded-md hover:bg-dark-blue">
          Login
        </button>
      </Link>
      <Link to="/create-account">
        <button className="bg-primary-blue text-soft-white px-4 py-2 rounded-md hover:bg-dark-blue">
          Create Account
        </button>
      </Link>
    </div>
  </div>
);

export default Landing;
