import { FC } from "react";
import { useQuery, QueryResult } from "@apollo/client";
import { GET_PROJECTS } from "../graphql/projects";
import { Loading } from ".";

const List: FC = () => {
  const { loading, error, data }: QueryResult = useQuery(GET_PROJECTS);

  console.log(loading, error, data);
  if (loading) return <Loading />;

  return <div>List</div>;
};

export default List;
