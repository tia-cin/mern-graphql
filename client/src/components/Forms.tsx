import { FC, useState, ChangeEvent, FormEvent } from "react";
import { ProjectType } from "../types";
import { useMutation } from "@apollo/client";
import { CREATE_PROJECT, GET_PROJECTS } from "../graphql/projects";
import { Error } from ".";

export const ProjectForm: FC = () => {
  const [project, setProject] = useState<ProjectType>({
    name: "",
    description: "",
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
    <form onSubmit={handleSubmit}>
      {error && <Error message={error.message} />}
      <input
        type="text"
        name="name"
        placeholder="Type a name"
        onChange={handleChange}
      />
      <textarea
        onChange={handleChange}
        name="description"
        rows={3}
        placeholder="Type a description"
      ></textarea>
      <button
        type="submit"
        disabled={!project.name || !project.description || loading}
      >
        Save
      </button>
    </form>
  );
};

export const TaskForm: FC = () => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };
  return (
    <form>
      <input type="text" name="title" />
      <button>Add</button>
    </form>
  );
};
