// Imports gql from apollo client
import { gql } from '@apollo/client';

// front end query to find user
export const GET_ME = gql`
  query me($_id: String!) {
    me(_id: $_id) {
      _id
      name
    }
  }
`;