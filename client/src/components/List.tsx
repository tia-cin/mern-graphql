import { FC } from "react";
import { useQuery, QueryResult } from "@apollo/client";
import { GET_PROJECTS } from "../graphql/projects";
import { Loading, Error, Card } from ".";
import { Project } from "../types";

const List: FC = () => {
  const { loading, error, data }: QueryResult = useQuery(GET_PROJECTS);

  if (loading) return <Loading />;
  if (error) return <Error message={error.message} />;

  return (
    <div>
      {data.getAllProjects?.map((p: Project) => (
        <Card key={p._id} {...p} />
      ))}
    </div>
  );
};

export default List;
