import { FC } from "react";
import { useQuery, QueryResult } from "@apollo/client";
import { GET_PROJECTS } from "../graphql/projects";
import { Loading, Error, ProjectCard, TaskCard } from ".";
import { ProjectType, TaskType } from "../types";

export const ProjectList: FC = () => {
  const { loading, error, data }: QueryResult = useQuery(GET_PROJECTS);

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {data.getAllProjects?.map((p: ProjectType) => (
        <ProjectCard key={p._id} {...p} />
      ))}
    </div>
  );
};

export const TaskList: FC<{ tasks: TaskType[] }> = ({ tasks }) => {
  return (
    <div className="space-y-4">
      {tasks.map((t) => (
        <TaskCard key={t._id} {...t} />
      ))}
    </div>
  );
};
