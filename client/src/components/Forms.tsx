import { FC, useState, ChangeEvent, FormEvent } from "react";
import { ProjectType } from "../types";
import { useMutation } from "@apollo/client";
import { CREATE_PROJECT, GET_PROJECTS } from "../graphql/projects";
import { Error, Loading } from ".";
import { CREATE_TASK } from "../graphql/tasks";
import { useParams } from "react-router-dom";

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
    <form
      className="my-4 flex md:flex-col md:justify-between items-center jus"
      onSubmit={handleSubmit}
    >
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
