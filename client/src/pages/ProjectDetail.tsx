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
    <div>
      <h1>{data.getProject.name}</h1>
      <p>{data.getProject.description}</p>
      <button>Delete</button>
      <TaskForm />
      <TaskList tasks={data.getProject.tasks} />
    </div>
  );
};

export default ProjectDetail;
