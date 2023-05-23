import { gql } from "@apollo/client";

export const GET_PROJECTS = gql`
  {
    getAllProjects {
      _id
      name
      description
      createdAt
      updatedAt
      tasks {
        _id
        title
        createdAt
        updatedAt
      }
    }
  }
`;
