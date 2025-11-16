import { gql } from 'apollo-angular';

export const GET_USERS = gql`
    query {
    users {
        id 
        userEmail
        username
    }
    }
`;

export const GET_EXPENSES = gql`
   query GetUserById($userId: Int!) {
    user(userId: $userId) {
      id
        expenseType{
            id totalAmountToBePaid totalAmountToGet
        }
    }
    }`;