import { FC } from "react";
import { ProjectType, TaskType } from "../types";
import { useNavigate } from "react-router-dom";

export const ProjectCard: FC<ProjectType> = ({ name, description, _id }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/projects/${_id}`)}>
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
};

export const TaskCard: FC<TaskType> = ({ title }) => {
  return (
    <div>
      <h4>{title}</h4>
      <button>Delete</button>
    </div>
  );
};
