import { gql } from "@apollo/client";

export const SIGN_UP = gql`
  mutation ($name: String, $email: String, $role: String, $password: String) {
    signup(name: $name, email: $email, role: $role, password: $password) {
      _id
      name
      email
      role
      createdAt
      updatedAt
    }
  }
`;

export const LOG_IN = gql`
  mutation ($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        name
        email
        role
        createdAt
        updatedAt
      }
    }
  }
`;

export const deleteAccount = gql`
  mutation {
    deleteAccount {
      _id
      name
      email
      role
      createdAt
      updatedAt
    }
  }
`;
