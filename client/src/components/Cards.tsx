import { FC } from "react";
import { ProjectType, TaskType } from "../types";
import { useNavigate } from "react-router-dom";
// import { useMutation } from "@apollo/client";
// import { DELETE_TASK } from "../graphql/tasks";
// import { GET_PROJECTS } from "../graphql/projects";

export const ProjectCard: FC<ProjectType> = ({
  name,
  description,
  _id,
  dueDate,
  status,
  // owner,
}) => {
  const navigate = useNavigate();
  return (
    <div
      className="cursor-pointer bg-pale-blue rouded-lg shadow-md p-4"
      onClick={() => navigate(`/projects/${_id}`)}
    >
      <h2 className="text-primary-blue text-lg font-semibold mb-2">{name}</h2>
      <p className="text-dark-gray">{description}</p>
      <p className="text-light-gray mt-2">Due Date: {dueDate}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-light-gray">Status: {status || "pending"}</span>
        <span className="text-light-gray">Owner: "Joe Doe"</span>
      </div>
    </div>
  );
};

export const TaskCard: FC<TaskType> = ({
  title,
  // _id,
  description,
  status,
  assignedTo,
  dueDate,
}) => {
  // const [deleteTask] = useMutation(DELETE_TASK, {
  //   refetchQueries: [{ query: GET_PROJECTS }],
  // });

  // const handleDelete = () => {
  //   deleteTask({
  //     variables: { id: _id },
  //   });
  // };

  return (
    <div className="bg-soft-white rounded-lg shadow-md p-4">
      <h2 className="text-primary-blue text-lg font-semibold mb-2">{title}</h2>
      <p className="text-dark-gray">{description}</p>
      <p className="text-light-gray mt-2">Due Date: {dueDate}</p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-light-gray">Status: {status}</span>
        <span className="text-light-gray">Assigned To: {assignedTo}</span>
      </div>
    </div>
  );
};
