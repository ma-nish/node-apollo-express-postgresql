import axios from 'axios';

const API_URL = 'http://localhost:8000/graphql';

export const user = async variables =>
  await axios.post(API_URL, {
    query: `
      query ($id: ID!) {
        user(id: $id) {
          id
          username
          email
          role
        }
      }
    `,
    variables,
  });

export const signIn = async variables =>
  await axios.post(API_URL, {
    query: `
      mutation ($login: String!, $password: String!) {
        signIn(login: $login, password: $password) {
          token
        }
      }
    `,
    variables,
  });

export const deleteUser = async (variables, token) =>
  await axios.post(
    API_URL,
    {
      query: `
        mutation ($id: ID!) {
          deleteUser(id: $id)
        }
      `,
      variables,
    },
    {
      headers: {
        'x-token': token,
      },
    },
  );

export const createMessage = async (variables, token) =>
  await axios.post(
    API_URL,
    {
      query: `
        mutation ($text: String!) {
          createMessage (text: $text) {
            text
          }
        }
      `,
      variables,
    },
    {
      headers: {
        'x-token': token
      }
    }
  )

export const deleteMessage = async (variables, token) =>
  await axios.post(
    API_URL,
    {
      query: `
        mutation ($id: ID!) {
          deleteMessage (id: $id)
        }
      `,
      variables
    },
    {
      headers: {
        'x-token': token
      }
    }
  )
