import { gql } from 'apollo-angular';

export const GET_USERS = gql`
    query {
    users{
        id 
        userEmail
        username
    }
    }
`;

export const GET_USER_EXPENSE_AND_INCOME_WITH_ID = gql`
   query GetUserById($userId: Int!) {
    user(userId: $userId) {
      id
        expenseType{
            id totalAmountToBePaid totalAmountToGet
        }
    }
    }`;

export const GET_USER_CONVERSATIONS = gql`
   query GetUserConversationsById($userId: Int!) {
    user(userId: $userId) {
            id
        conversationType
        {
            conversationId
            conversationName
        }
    }
    }`;