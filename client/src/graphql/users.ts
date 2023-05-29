import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation ($registerInput: RegisterInput!) {
    registerUser(registerInput: $registerInput) {
      email
      password
      token
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
