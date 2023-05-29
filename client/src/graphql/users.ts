import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation ($registerInput: RegisterInput) {
    registerUser(registerInput: $registerInput) {
      _id
      name
      email
      token
      role
      image
      createdAt
      updatedAt
    }
  }
`;

export const LOG_IN = gql`
  mutation ($loginInput: LoginInput) {
    login(loginInput: $loginInput) {
      token
      user {
        _id
        name
        email
        role
        image
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
