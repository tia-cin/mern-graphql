import { FC } from "react";
import { useQuery, QueryResult } from "@apollo/client";
import { GET_PROJECTS } from "../graphql/projects";
import { Loading, Error } from ".";
import { Project } from "../types";

const List: FC = () => {
  const { loading, error, data }: QueryResult = useQuery(GET_PROJECTS);

  console.log(loading, error, data);
  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <div>
      {data.projects.map((p: Project) => (
        <div key={p._id}></div>
      ))}
    </div>
  );
};

export default List;
