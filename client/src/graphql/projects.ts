import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  {
    getAllProjects {
      _id
      name
    }
  }
`;
