import { FC } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_PROJECT } from "../graphql/projects";
import { Error, Loading, TaskList, TaskForm } from "../components";

const ProjectDetail: FC = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_PROJECT, {
    variables: { id: id },
    skip: !id,
  });

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <div className="mx-auto">
      <h1 className="text-2xl font-bold mb-4">{data.getProject.name}</h1>
      <p className="text-dark-gray mb-4">{data.getProject.description}</p>
      <button className="bg-red-500 text-white px-4 py-2 rounded">
        Delete
      </button>
      <div className="mt-8">
        <h2 className="text-xl font-bold-mb-4">Add Task</h2>
        <TaskForm />
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-bold mb-4">Tasks</h2>
        <TaskList tasks={data.getProject.tasks} />
      </div>
    </div>
  );
};

export default ProjectDetail;
