import { FC } from "react";
import { ProjectType, TaskType } from "../types";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { DELETE_TASK } from "../graphql/tasks";
import { GET_PROJECTS } from "../graphql/projects";

export const ProjectCard: FC<ProjectType> = ({ name, description, _id }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/projects/${_id}`)}>
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
};

export const TaskCard: FC<TaskType> = ({ title, _id }) => {
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_PROJECTS }],
  });

  const handleDelete = () => {
    deleteTask({
      variables: { id: _id },
    });
  };

  return (
    <div>
      <h4>{title}</h4>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};
