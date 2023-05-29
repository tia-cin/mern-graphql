import { FC, useState, ChangeEvent, FormEvent } from "react";
import { ProjectType } from "../types";
import { useMutation } from "@apollo/client";
import { CREATE_PROJECT, GET_PROJECTS } from "../graphql/projects";
import { Error, Loading } from ".";
import { CREATE_TASK } from "../graphql/tasks";
import { Link, useParams } from "react-router-dom";
import { CREATE_USER, LOG_IN } from "../graphql/users";

export const ProjectForm: FC = () => {
  const [project, setProject] = useState<ProjectType>({
    name: "",
    description: "",
    dueDate: "",
    members: [],
    owner: "",
    status: "",
  });

  const [createProject, { loading, error }] = useMutation(CREATE_PROJECT, {
    refetchQueries: [{ query: GET_PROJECTS }, "GetProjects"],
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProject((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProject({
      variables: { name: project.name, description: project.description },
    });
  };
  return (
    <form className="my-4 grid grid-cols-1" onSubmit={handleSubmit}>
      {error && <Error message={error.message} />}
      <input
        className="border w-full border-light-gray rouded p-2 mb-2"
        type="text"
        name="name"
        placeholder="Type a name"
        onChange={handleChange}
      />
      <textarea
        className="border w-full border-light-gray rounded p-2 mb-2"
        onChange={handleChange}
        name="description"
        rows={3}
        placeholder="Type a description"
      ></textarea>
      <button
        className="bg-primary-blue text-white px-4 py-2 rouded disabled:opacity-50"
        type="submit"
        disabled={!project.name || !project.description || loading}
      >
        Save
      </button>
    </form>
  );
};

export const TaskForm: FC = () => {
  const { id } = useParams();
  const [title, setTitle] = useState<string>("");

  const [createTask, { loading, error }] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTask({
      variables: {
        title: title,
        projectId: id,
      },
    });
    setTitle("");
  };

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <form className="my-4" onSubmit={handleSubmit}>
      <input
        className="border border-light-gray rounded p-2 mr-2"
        type="text"
        name="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <button
        className="bg-primary-blue text-white px-4 py-2 rounded"
        type="submit"
      >
        Add
      </button>
    </form>
  );
};

export const SignIn: FC = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [createUser] = useMutation(CREATE_USER);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createUser({
      variables: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });
  };
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-sm mx-auto bg-white rounded shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Signup</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={handleChange}
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-primary-blue text-white font-bold py-2 rounded hover:bg-medium-blue transition-colors duration-300"
          >
            Signup
          </button>
        </form>
        <p className="text-center mt-4">
          Already a user?{" "}
          <Link to="/login" className="text-primary-blue font-bold">
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
};

export const LogIn: FC = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [login] = useMutation(LOG_IN);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({
      variables: { email: user.email, password: user.password },
    });
  };

  const handleChenge = (e: ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="max-w-sm mx-auto bg-white rounded shadow-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            onChange={handleChenge}
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
          <input
            type="password"
            placeholder="Password"
            onChange={handleChenge}
            className="w-full border border-gray-300 px-4 py-2 rounded"
          />
          <button
            type="submit"
            className="w-full bg-primary-blue text-white font-bold py-2 rounded hover:bg-medium-blue transition-colors duration-300"
          >
            Login
          </button>
        </form>
        <p className="text-center mt-4">
          Don't have an account?{" "}
          <Link to="/signin" className="text-primary-blue font-bold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};
