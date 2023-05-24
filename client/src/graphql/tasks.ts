import { gql } from "@apollo/client";

export const CREATE_TASK = gql`
  mutation ($title: String, $projectId: ID) {
    createTask(title: $title, projectId: $projectId) {
      title
      project {
        _id
        name
        description
      }
      createdAt
      updatedAt
    }
  }
`;

export const DELETE_TASK = gql`
  mutation ($id: ID) {
    deleteTask(id: $id) {
      _id
      title
    }
  }
`;
